#!/usr/bin/env python3
"""Build the "Common network ports" deck (port number <-> service) from IANA's
Service Name and Transport Protocol Port Number Registry, in the solid-memo
Turtle deck format.

Generates decks/network-ports.ttl. Python 3.10+, standard library only. The
registry (~1 MB CSV) is fetched on every run; nothing else is written to disk.

USAGE
  python3 scripts/generate_deck_of_network_ports.py \\
      -o decks/network-ports.ttl --creator "Name <email>"

SOURCE
  IANA  https://www.iana.org/assignments/service-names-port-numbers   CC0 1.0
        (https://www.iana.org/help/licensing-terms), so the deck is CC0 too.

METHOD
  The registry names about 700 ports below 1024 alone, most of them long
  obsolete (gopher, finger, ...). The deck is the hand-picked list PORTS below:
  ports people meet in practice, each with the IANA service name it is
  assigned to and a readable name for the card. The registry is the check,
  not the selection: every entry must still be assigned to that service name
  there, or the run fails. Ports that are used by convention but assigned to
  something else (Kafka's 9092, Elasticsearch's 9200, Kubernetes' 6443) are
  left out, so every card is an IANA assignment.

  Cards: the port number on the front, the readable name on the back, studied
  both ways. Card ids are "<port>-<iana service name>", stable across runs.

PROVENANCE IN THE DECK
  As in generate_decks_for_swedish_learning.py: prov:wasDerivedFrom the
  registry, and prov:wasGeneratedBy an activity naming the exact command line
  and this script, pinned to the commit at HEAD when the script is committed
  and unmodified there (otherwise to main, with a warning).
"""

from __future__ import annotations

import argparse
import csv
import io
import os
import re
import shlex
import subprocess
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

REGISTRY_URL = "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv"
REGISTRY_PAGE = "https://www.iana.org/assignments/service-names-port-numbers"
USER_AGENT = "solid-memo deck generator (https://github.com/antwika/solid-memo)"

# (port, IANA service name, card text). Back texts must be unique: the deck is
# studied both ways.
PORTS: list[tuple[int, str, str]] = [
    (20, "ftp-data", "FTP data transfer"),
    (21, "ftp", "FTP (File Transfer Protocol) control"),
    (22, "ssh", "SSH (Secure Shell)"),
    (23, "telnet", "Telnet"),
    (25, "smtp", "SMTP (Simple Mail Transfer Protocol)"),
    (53, "domain", "DNS (Domain Name System)"),
    (67, "bootps", "DHCP server (BOOTP server)"),
    (68, "bootpc", "DHCP client (BOOTP client)"),
    (69, "tftp", "TFTP (Trivial File Transfer Protocol)"),
    (80, "http", "HTTP"),
    (88, "kerberos", "Kerberos"),
    (110, "pop3", "POP3 (Post Office Protocol 3)"),
    (119, "nntp", "NNTP (Usenet news)"),
    (123, "ntp", "NTP (Network Time Protocol)"),
    (135, "epmap", "Microsoft RPC endpoint mapper"),
    (137, "netbios-ns", "NetBIOS name service"),
    (138, "netbios-dgm", "NetBIOS datagram service"),
    (139, "netbios-ssn", "NetBIOS session service"),
    (143, "imap", "IMAP (Internet Message Access Protocol)"),
    (161, "snmp", "SNMP (Simple Network Management Protocol)"),
    (162, "snmptrap", "SNMP traps"),
    (179, "bgp", "BGP (Border Gateway Protocol)"),
    (389, "ldap", "LDAP (Lightweight Directory Access Protocol)"),
    (443, "https", "HTTPS (HTTP over TLS)"),
    (445, "microsoft-ds", "SMB (Windows file sharing)"),
    (465, "submissions", "Mail submission over TLS (SMTPS)"),
    (500, "isakmp", "IKE (IPsec key exchange)"),
    (514, "syslog", "Syslog"),
    (515, "printer", "LPD (Line Printer Daemon)"),
    (546, "dhcpv6-client", "DHCPv6 client"),
    (547, "dhcpv6-server", "DHCPv6 server"),
    (554, "rtsp", "RTSP (Real Time Streaming Protocol)"),
    (587, "submission", "Mail submission (SMTP from mail clients)"),
    (631, "ipp", "IPP (Internet Printing Protocol)"),
    (636, "ldaps", "LDAPS (LDAP over TLS)"),
    (853, "domain-s", "DNS over TLS"),
    (873, "rsync", "rsync"),
    (989, "ftps-data", "FTPS data (FTP over TLS)"),
    (990, "ftps", "FTPS control (FTP over TLS)"),
    (993, "imaps", "IMAPS (IMAP over TLS)"),
    (995, "pop3s", "POP3S (POP3 over TLS)"),
    (1080, "socks", "SOCKS proxy"),
    (1194, "openvpn", "OpenVPN"),
    (1433, "ms-sql-s", "Microsoft SQL Server"),
    (1701, "l2tp", "L2TP (Layer 2 Tunneling Protocol)"),
    (1723, "pptp", "PPTP (Point-to-Point Tunneling Protocol)"),
    (1812, "radius", "RADIUS authentication"),
    (1813, "radius-acct", "RADIUS accounting"),
    (1883, "mqtt", "MQTT"),
    (2049, "nfs", "NFS (Network File System)"),
    (2375, "docker", "Docker API (unencrypted)"),
    (2376, "docker-s", "Docker API over TLS"),
    (2379, "etcd-client", "etcd client API"),
    (2380, "etcd-server", "etcd peer communication"),
    (3306, "mysql", "MySQL"),
    (3389, "ms-wbt-server", "RDP (Remote Desktop Protocol)"),
    (3478, "stun", "STUN and TURN (NAT traversal)"),
    (3690, "svn", "Subversion (svnserve)"),
    (4500, "ipsec-nat-t", "IPsec NAT traversal"),
    (4789, "vxlan", "VXLAN"),
    (5060, "sip", "SIP (Session Initiation Protocol)"),
    (5061, "sips", "SIP over TLS"),
    (5222, "xmpp-client", "XMPP client connections"),
    (5269, "xmpp-server", "XMPP server-to-server connections"),
    (5353, "mdns", "mDNS (Multicast DNS)"),
    (5432, "postgresql", "PostgreSQL"),
    (5671, "amqps", "AMQP over TLS"),
    (5672, "amqp", "AMQP (e.g. RabbitMQ)"),
    (5900, "rfb", "VNC (Remote Framebuffer protocol)"),
    (5984, "couchdb", "CouchDB"),
    (6379, "redis", "Redis"),
    (6514, "syslog-tls", "Syslog over TLS"),
    (6697, "ircs-u", "IRC over TLS"),
    (8080, "http-alt", "HTTP alternate"),
    (8883, "secure-mqtt", "MQTT over TLS"),
    (9418, "git", "Git protocol (git://)"),
    (11211, "memcache", "Memcached"),
    (27017, "mongodb", "MongoDB"),
]


# --------------------------------------------------------------------------- registry


def load_registry() -> dict[int, set[str]]:
    """Port number -> the service names assigned to it, over every transport."""
    print(f"fetching {REGISTRY_URL}", file=sys.stderr)
    req = urllib.request.Request(REGISTRY_URL, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req) as resp:
        text = io.TextIOWrapper(resp, encoding="utf-8").read()
    assigned: dict[int, set[str]] = {}
    for row in csv.DictReader(io.StringIO(text)):
        port, name = row["Port Number"], row["Service Name"]
        if port.isdigit() and name:  # skips ranges ("6665-6669") and unnamed reservations
            assigned.setdefault(int(port), set()).add(name)
    return assigned


def check_ports(assigned: dict[int, set[str]]) -> None:
    errors = [
        f"  {port}: IANA assigns {sorted(assigned.get(port, ())) or 'nothing'}, not {service!r}"
        for port, service, _ in PORTS
        if service not in assigned.get(port, ())
    ]
    backs = [back for _, _, back in PORTS]
    errors += [f"  duplicate card text {b!r}" for b in sorted({b for b in backs if backs.count(b) > 1})]
    if errors:
        sys.exit("the port list no longer matches the registry:\n" + "\n".join(errors))


# --------------------------------------------------------------------------- provenance

REPO_URL = "https://github.com/antwika/solid-memo"


def script_provenance() -> tuple[str, str]:
    """Return (script_url, command) describing this run for the deck's PROV block.

    Pinned to the commit at HEAD when the script is committed there and
    unmodified, otherwise `main` with a warning (see the module docstring).
    """
    script = Path(__file__).resolve()

    def git(*args: str) -> str | None:
        try:
            return subprocess.run(["git", *args], cwd=script.parent, capture_output=True,
                                  text=True, check=True).stdout.strip()
        except (OSError, subprocess.CalledProcessError):
            return None

    top = git("rev-parse", "--show-toplevel")
    rel = os.path.relpath(script, top).replace(os.sep, "/") if top else script.name
    command = shlex.join(["python3", rel, *sys.argv[1:]])

    ref = "main"
    sha = git("rev-parse", "HEAD") if top else None
    tracked = top and git("ls-files", "--error-unmatch", str(script)) is not None
    clean = tracked and git("status", "--porcelain", "--", str(script)) == ""
    if sha and clean:
        ref = sha
    else:
        print(f"warning: {rel} is not committed and clean at HEAD; provenance URL will "
              f"point at 'main' instead of a commit", file=sys.stderr)
    return f"{REPO_URL}/blob/{ref}/{rel}", command


# --------------------------------------------------------------------------- Turtle


def ttl_str(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ") + '"'


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def aligned(predicate: str, objects: list[str]) -> str:
    """An object list in the house style: one object per line, aligned under the first."""
    return (" ,\n" + " " * (5 + len(predicate))).join(objects)


CC0 = "<https://creativecommons.org/publicdomain/zero/1.0/>"


def write_deck(path: Path, *, creator: str | None, created: str, script_url: str, command: str) -> None:
    description = (
        f"{len(PORTS)} TCP and UDP port numbers you meet in practice and the services IANA assigns "
        "them, from 22 (SSH) and 443 (HTTPS) to databases, mail, VPNs and message brokers. The port "
        "on the front, the service on the back. Ports used only by convention, such as Kafka's 9092, "
        "are left out: every card is an assignment in IANA's Service Name and Port Number Registry."
    )
    out: list[str] = [
        f"@base <https://solid-memo.com/decks/{slug(path.stem)}> .",
        "",
        "@prefix solid-memo: <https://solid-memo.com/vocab/v1#> .",
        "@prefix dcterms:    <http://purl.org/dc/terms/> .",
        "@prefix prov:       <http://www.w3.org/ns/prov#> .",
        "@prefix rdfs:       <http://www.w3.org/2000/01/rdf-schema#> .",
        "@prefix xsd:        <http://www.w3.org/2001/XMLSchema#> .",
        "@prefix dcat:       <http://www.w3.org/ns/dcat#> .",
        "@prefix foaf:       <http://xmlns.com/foaf/0.1/> .",
        "@prefix topic:      <https://solid-memo.com/vocab/topics#> .",
        "",
        "<>",
        "    a solid-memo:Deck ,",
        "      dcat:Dataset ;",
        '    dcterms:title "Common network ports" ;',
    ]
    creator_name, creator_email = None, None
    if creator:
        match = re.fullmatch(r"\s*(.*?)\s*<([^\s<>@]+@[^\s<>@]+)>\s*", creator)
        creator_name, creator_email = (match.group(1), match.group(2)) if match else (creator.strip(), None)
        out.append(f"    dcterms:creator <#{slug(creator_name)}> ;")
    out += [
        f"    dcterms:license {CC0} ;",
        f"    dcterms:description {ttl_str(description)} ;",
        f"    prov:wasDerivedFrom <{REGISTRY_PAGE}> ;",
        "    prov:wasGeneratedBy <#generation> ;",
        f'    dcterms:created "{created}"^^xsd:dateTime ;',
        "    dcat:theme "
        + aligned("dcat:theme", ["<http://publications.europa.eu/resource/authority/data-theme/EDUC>", "topic:computing"])
        + " ;",
        "    dcat:keyword " + aligned("dcat:keyword", ['"networking"', '"ports"', '"TCP"', '"UDP"']) + " ;",
        "    dcterms:language <http://publications.europa.eu/resource/authority/language/ENG> ;",
        "    solid-memo:studyDirection solid-memo:bidirectional ;",
        "    solid-memo:formatVersion 3 .",
        "",
    ]
    if creator_name is not None:
        out += [f"<#{slug(creator_name)}>", "    a foaf:Agent ;"]
        out.append(f"    foaf:name {ttl_str(creator_name)}" + (" ;" if creator_email else " ."))
        if creator_email:
            out.append(f"    foaf:mbox <mailto:{creator_email}> .")
        out.append("")
    out += [
        CC0,
        "    a dcterms:LicenseDocument .",
        "",
        "# How this deck was produced (W3C PROV-O). Re-run the command below to regenerate it.",
        "<#generation>",
        "    a prov:Activity ;",
        f'    prov:endedAtTime "{created}"^^xsd:dateTime ;',
        f"    prov:used <{REGISTRY_PAGE}> ;",
        f"    prov:wasAssociatedWith <{script_url}> ;",
        f"    rdfs:comment {ttl_str(command)} .",
        "",
        f"<{script_url}>",
        "    a prov:SoftwareAgent ;",
        f"    dcterms:title {ttl_str(Path(script_url).name)} .",
        "",
        f"<{REGISTRY_PAGE}>",
        '    dcterms:title "Service Name and Transport Protocol Port Number Registry" ;',
        '    dcterms:creator "Internet Assigned Numbers Authority" ;',
        f"    dcterms:license {CC0} .",
    ]
    for port, service, back in PORTS:
        out += [
            "",
            f"<#{port}-{slug(service)}>",
            "    a solid-memo:Card ;",
            "    solid-memo:formatVersion 1 ;",
            f'    dcterms:created "{created}"^^xsd:dateTime ;',
            f'    solid-memo:front "{port}" ;',
            f"    solid-memo:back {ttl_str(back)} .",
        ]

    path.write_text("\n".join(out) + "\n", encoding="utf-8")


# --------------------------------------------------------------------------- main


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("-o", "--output", type=Path, required=True, help="deck file to write (.ttl)")
    ap.add_argument("--creator", default=None, help='dcterms:creator, e.g. "Name <email>"')
    args = ap.parse_args()
    if args.output.suffix != ".ttl":
        ap.error(f"{args.output}: output must be a .ttl file")

    check_ports(load_registry())
    created = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    script_url, command = script_provenance()
    write_deck(args.output, creator=args.creator, created=created, script_url=script_url, command=command)
    print(f"wrote {args.output}: {len(PORTS)} cards", file=sys.stderr)


if __name__ == "__main__":
    main()
