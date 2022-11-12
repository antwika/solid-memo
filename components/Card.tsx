'use client'

import useSWR from 'swr';
import { sm2 } from "src/lib/sm2";
import Badge from "@/ui/Badge";
import Button from "@/ui/Button";
import { useEffect, useState } from "react";
import {
  Parser as N3Parser,
  Store as N3Store,
} from 'n3';
import { fetcher } from 'src/lib/swr';

type Detail = {
  repetition: number,
  ease: number,
  interval: number,
  front: string,
  back: string,
}

function parseDetail(iri: string, raw: string) {
  const store = new N3Store(new N3Parser().parse(raw));
  return {
    repetition: +store.getObjects(iri, 'https://antwika.com/vocab/solidmemo/0.1/repetition', null)[0]?.value,
    ease: +store.getObjects(iri, 'https://antwika.com/vocab/solidmemo/0.1/ease', null)[0]?.value,
    interval: +store.getObjects(iri, 'https://antwika.com/vocab/solidmemo/0.1/interval', null)[0]?.value,
    front: store.getObjects(iri, 'https://antwika.com/vocab/solidmemo/0.1/front', null)[0]?.value,
    back: store.getObjects(iri, 'https://antwika.com/vocab/solidmemo/0.1/back', null)[0]?.value,
  };
}

type Props = {
  iri: string,
};

export default function Card(props: Props) {
  const { data: raw } = useSWR(props.iri, fetcher);
  const [ revealed, setRevealed ] = useState<boolean>(false);
  const [ detail, setDetail ] = useState<Detail | undefined>();

  useEffect(() => {
    if (!raw) return;
    setDetail(parseDetail(props.iri, raw));
  }, [props.iri, raw]);

  if (!detail) {
    return <>Loading card...</>;
  }

  const onGrade = (grade: number) => {
    const result = sm2({ grade, repetition: detail.repetition, ease: detail.ease, interval: detail.interval });
    setDetail({
      repetition: result.repetition,
      ease: result.ease,
      interval: result.interval,
      front: detail.front,
      back: detail.back,
    });
  }

  return (
    <div className="p-2 rounded-lg bg-slate-200 space-y-2">
      <Badge>IRI:{ props.iri }</Badge>
      <div className="flex space-x-2">
        <Badge>Entity:Card</Badge>
        <Badge>Repetition:{ detail.repetition }</Badge>
        <Badge>Ease:{ detail.ease }</Badge>
        <Badge>Interval:{ detail.interval }</Badge>
      </div>
      <div className='space-x-2'>
        <span>Front:</span><strong>{ detail.front }</strong>
      </div>
      { revealed && (
        <div className='space-x-2'>
          <span>Back:</span><strong>{ detail.back }</strong>
        </div>
      )}
      { !revealed && (
        <>
          <Button onClick={() => { setRevealed(true); }}>Reveal</Button>
        </>
      )}
      { revealed && (
        <>
          <Button className="bg-red-500" onClick={() => onGrade(0)}>Again</Button>
          <Button className="bg-orange-500" onClick={() => onGrade(3)}>Hard</Button>
          <Button className="bg-green-500" onClick={() => onGrade(4)}>Okay</Button>
          <Button onClick={() => onGrade(5)}>Easy</Button>
        </>
      )}
    </div>
  );
};
