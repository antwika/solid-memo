import React from 'react';
import {
  Parser as N3Parser,
  Store as N3Store,
} from 'n3';
import Card from './Card';

type Props = {
  dataTestid?: string,
  iri: string,
  raw: string,
};

export default function Resource({ dataTestid, raw }: Props) {
  const store = new N3Store(new N3Parser().parse(raw));
  const subjects = store.getSubjects(null, null, null);

  const renderedNodes: React.ReactNode[] = [];

  subjects.forEach((subject) => {
    const type = store.getObjects(subject.id, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', null)[0].value;
    if (type === 'https://antwika.com/vocab/solidmemo/0.1/Card') {
      renderedNodes.push(
        <Card
          key={subject.id}
          iri={subject.id}
        />,
      );
    } else {
      console.log(`Could not render resource, reason: Unknown type "${type}"`);
    }
  });

  return (
    <div data-testid={dataTestid} className="flex flex-col p-2 space-y-2">
      { renderedNodes }
    </div>
  );
}
