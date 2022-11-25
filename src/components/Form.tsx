'use client';

import Button from 'src/ui/Button';
import TextField from 'src/ui/TextField';
import { useState } from 'react';

type Props = {
  dataTestid?: string,
};

export default function Form({ dataTestid }: Props) {
  const [iri, setIri] = useState('');

  return (
    <div data-testid={dataTestid} className="space-x-2">
      <div>Example: http://localhost:4000/alice/solidmemo/data</div>
      <TextField dataTestid={`${dataTestid}-textField`} placeholder="Enter IRI" value={iri} onChange={(evt) => setIri((evt.target as HTMLInputElement).value)} />
      <Button dataTestid={`${dataTestid}-button`} onClick={() => { window.location.href = `/resource/${encodeURIComponent(iri)}`; }}>Look up a resource</Button>
    </div>
  );
}
