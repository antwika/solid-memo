'use client';

import Button from 'src/ui/Button';
import { useState } from 'react';
import useCardDetail from '@/hooks/useCardDetail';
import { sm2 } from '@/lib/sm2';
import CardView from '@/components/CardView';

type Props = {
  dataTestid?: string,
  iri: string,
};

export default function Card(props: Props) {
  const { dataTestid } = props;
  const { cardDetail, setCardDetail } = useCardDetail(props.iri);
  const [revealed, setRevealed] = useState<boolean>(false);

  if (!cardDetail) {
    return <div data-testid={dataTestid}>Loading card...</div>;
  }

  const onGrade = (grade: number) => {
    const result = sm2({
      grade,
      repetition: cardDetail.repetition,
      ease: cardDetail.ease,
      interval: cardDetail.interval,
    });
    setCardDetail({
      repetition: result.repetition,
      ease: result.ease,
      interval: result.interval,
      front: cardDetail.front,
      back: cardDetail.back,
    });
  };

  return (
    <div data-testid={dataTestid} className="p-2 rounded-lg bg-slate-200 space-y-2">
      <CardView
        dataTestid={`${dataTestid}-cardView`}
        iri={props.iri}
        repetition={cardDetail?.repetition.toString()}
        ease={cardDetail?.ease.toString()}
        interval={cardDetail?.interval.toString()}
        front={cardDetail?.front}
        back={cardDetail?.back}
        revealed={revealed}
        onGrade={onGrade}
      />
      { !revealed && (
        <>
          <Button dataTestid={`${dataTestid}-revealButton`} onClick={() => { setRevealed(true); }}>Reveal</Button>
        </>
      )}
    </div>
  );
}
