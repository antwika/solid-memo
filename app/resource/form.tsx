'use client';

import env from "@/lib/env";
import Button from "@/ui/Button";
import TextField from "@/ui/TextField";
import { useState } from "react";

export default function Form() {
  const [iri, setIri] = useState('');

  return (
    <div className="space-x-2">
      <div>Example: http://localhost:4000/alice/solidmemo/data</div>
      <TextField placeholder="Enter IRI" value={iri} onChange={evt => setIri((evt.target as HTMLInputElement).value)} />
      <Button onClick={() => { window.location.href = `${env.NEXTAUTH_URL}/resource/${encodeURIComponent(iri)}`; }}>Look up a resource</Button>
    </div>
  );
}