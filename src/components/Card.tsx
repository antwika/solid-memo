'use client'

import Badge from "src/ui/Badge";
import Button from "src/ui/Button";
import { useState } from "react";
import useCardDetail from '@/hooks/useCardDetail';
import { sm2 } from "@/lib/sm2";

type Props = {
  dataTestid?: string,
  iri: string,
};

export default function Card(props: Props) {
  const { dataTestid } = props;
  const { cardDetail, setCardDetail } = useCardDetail(props.iri);
  const [ revealed, setRevealed ] = useState<boolean>(false);

  if (!cardDetail) {
    return <div data-testid={dataTestid}>Loading card...</div>;
  }

  const onGrade = (grade: number) => {
    const result = sm2({ grade, repetition: cardDetail.repetition, ease: cardDetail.ease, interval: cardDetail.interval });
    setCardDetail({
      repetition: result.repetition,
      ease: result.ease,
      interval: result.interval,
      front: cardDetail.front,
      back: cardDetail.back,
    });
  }

  return (
    <div data-testid={dataTestid} className="p-2 rounded-lg bg-slate-200 space-y-2">
      <Badge>IRI:{ props.iri }</Badge>
      <div className="flex space-x-2">
        <Badge>Entity:Card</Badge>
        <Badge>Repetition:{ cardDetail.repetition }</Badge>
        <Badge>Ease:{ cardDetail.ease }</Badge>
        <Badge>Interval:{ cardDetail.interval }</Badge>
      </div>
      <div className='space-x-2'>
        <span>Front:</span><strong>{ cardDetail.front }</strong>
      </div>
      { revealed && (
        <>
          <div className='space-x-2'>
            <span>Back:</span><strong>{ cardDetail.back }</strong>
          </div>
          <Button dataTestid={`${dataTestid}-againButton`} className="bg-red-500" onClick={() => onGrade(0)}>Again</Button>
          <Button dataTestid={`${dataTestid}-hardButton`} className="bg-orange-500" onClick={() => onGrade(3)}>Hard</Button>
          <Button dataTestid={`${dataTestid}-okayButton`} className="bg-green-500" onClick={() => onGrade(4)}>Okay</Button>
          <Button dataTestid={`${dataTestid}-easyButton`} onClick={() => onGrade(5)}>Easy</Button>
        </>
      )}
      { !revealed && (
        <>
          <Button dataTestid={`${dataTestid}-revealButton`} onClick={() => { setRevealed(true); }}>Reveal</Button>
        </>
      )}
    </div>
  );
};
