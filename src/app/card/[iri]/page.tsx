import EditableCard from '@/components/EditableCard';
import React from 'react';
import Title from 'src/ui/Title';

const dataTestid = 'test-page';

type Params = {
  iri: string,
};

type Props = {
  params: Params;
  children?: React.ReactNode;
};

export default function Page({ params }: Props) {
  const { iri } = params;

  return (
    <div data-testid={dataTestid} className="space-y-2">
      <Title dataTestid={`${dataTestid}-title`} text="Card" />
      <div className="flex text-xl space-x-2 justify-center items-center">
        <EditableCard iri={iri} />
      </div>
    </div>
  );
}
