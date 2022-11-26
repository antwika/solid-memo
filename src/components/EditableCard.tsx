'use client';

import useCardDetail from '@/hooks/useCardDetail';
import Button from '@/ui/Button';
import { useState } from 'react';
import { sm2 } from '@/lib/sm2';
import CardView from './CardView';
import CardForm from './CardForm';

type Props = {
  dataTestid?: string,
  iri: string,
};

export default function EditableCard({ dataTestid, iri }: Props) {
  const { cardDetail, setCardDetail } = useCardDetail(iri);
  const [editMode, setEditMode] = useState(false);
  const [revealed, setRevealed] = useState(false);

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
    <div data-testid={dataTestid}>
      <div>
        {!editMode && (
          <>
            <CardView
              dataTestid={`${dataTestid}-cardView`}
              iri={iri}
              repetition={cardDetail.repetition.toString()}
              ease={cardDetail.ease.toString()}
              interval={cardDetail.interval.toString()}
              front={cardDetail.front}
              back={cardDetail.back}
              revealed={revealed}
              onGrade={onGrade}
            />
            <Button dataTestid={`${dataTestid}-revealButton`} onClick={() => {
              setRevealed(!revealed);
            }}>
              {!revealed ? 'Reveal' : 'Hide'}
            </Button>
          </>
        )}
        {editMode && <CardForm
          dataTestid={`${dataTestid}-cardForm`}
          fields={[
            {
              id: 'iri',
              label: 'Iri',
              value: iri,
            },
            {
              id: 'repetition',
              label: 'Repetition',
              value: cardDetail.repetition.toString(),
            },
            {
              id: 'ease',
              label: 'Ease',
              value: cardDetail.ease.toString(),
            },
            {
              id: 'interval',
              label: 'Interval',
              value: cardDetail.interval.toString(),
            },
            {
              id: 'front',
              label: 'Front',
              value: cardDetail.front,
            },
            {
              id: 'back',
              label: 'Back',
              value: cardDetail.back,
            },
          ]}
          onSubmit={(e, values) => {
            e.preventDefault();
            console.log({ values });
            setCardDetail({
              repetition: parseInt(values.repetition, 10),
              ease: parseFloat(values.ease),
              interval: parseInt(values.interval, 10),
              front: values.front,
              back: values.back,
            });
          }}
        />}
      </div>
      <div>
        <Button dataTestid={`${dataTestid}-editModeButton`} onClick={() => {
          setEditMode(!editMode);
        }}>
          {!editMode ? 'Activate edit mode' : 'Deactivate edit mode'}
        </Button>
      </div>
    </div>
  );
}
