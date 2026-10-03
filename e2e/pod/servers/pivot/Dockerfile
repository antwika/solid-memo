# Pivot (solid-contrib/pivot, the server of solidcommunity.net) for the
# end-to-end tests (docs/testing.md): the Community Solid Server with
# Pivot's components, from the lockfile beside this file, run with
# pivot-e2e.json. Pivot's own views name their templates relative to the
# working directory, hence the link. Nothing it needs is an install script.
FROM node:22-bookworm-slim@sha256:43ac6c60b8f89723f746e8a92ce91abd5017e627ce1ddfe4238355d3a30b772c
WORKDIR /srv/pivot
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --omit=dev --no-audit --no-fund && ln -s node_modules/@solid/pivot/templates templates
COPY pivot-e2e.json ./
USER node
ENTRYPOINT ["node", "node_modules/@solid/community-server/bin/server.js", "-m", ".", "-c", "pivot-e2e.json"]
