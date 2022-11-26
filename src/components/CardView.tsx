'use client';

import Badge from 'src/ui/Badge';
import Button from 'src/ui/Button';

type Props = {
  dataTestid?: string,
  iri: string,
  repetition: string,
  ease: string,
  interval: string,
  front: string,
  back: string,
  revealed: boolean,
  onGrade: (grade: number) => void,
};

export default function Card(props: Props) {
  const {
    dataTestid,
    iri,
    repetition,
    ease,
    interval,
    front,
    back,
    revealed,
    onGrade,
  } = props;
  return (
    <div data-testid={dataTestid} className="p-2 rounded-lg bg-slate-200 space-y-2">
      <Badge>IRI:{ iri }</Badge>
      <div className="flex space-x-2">
        <Badge>Entity:Card</Badge>
        <Badge>Repetition:{ repetition }</Badge>
        <Badge>Ease:{ ease }</Badge>
        <Badge>Interval:{ interval }</Badge>
      </div>
      <div className='space-x-2'>
        <span>Front:</span><strong>{ front }</strong>
      </div>
      { revealed && (
        <>
          <div className='space-x-2'>
            <span>Back:</span><strong>{ back }</strong>
          </div>
          <Button dataTestid={`${dataTestid}-againButton`} className="bg-red-500" onClick={() => onGrade(0)}>Again</Button>
          <Button dataTestid={`${dataTestid}-hardButton`} className="bg-orange-500" onClick={() => onGrade(3)}>Hard</Button>
          <Button dataTestid={`${dataTestid}-okayButton`} className="bg-green-500" onClick={() => onGrade(4)}>Okay</Button>
          <Button dataTestid={`${dataTestid}-easyButton`} onClick={() => onGrade(5)}>Easy</Button>
        </>
      )}
    </div>
  );
}
