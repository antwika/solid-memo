import useSWR from 'swr';
import { fetcher } from 'src/lib/swr';
import {
  Parser as N3Parser,
  Store as N3Store,
} from 'n3';
import { useEffect, useState } from 'react';

type CardDetail = {
  repetition: number,
  ease: number,
  interval: number,
  front: string,
  back: string,
};

function parseCardDetail(iri: string, raw: string): CardDetail {
  const store = new N3Store(new N3Parser().parse(raw));
  return {
    repetition: parseInt(store.getObjects(iri, 'https://antwika.com/vocab/solidmemo/0.1/repetition', null)[0]?.value, 10),
    ease: parseFloat(store.getObjects(iri, 'https://antwika.com/vocab/solidmemo/0.1/ease', null)[0]?.value),
    interval: parseInt(store.getObjects(iri, 'https://antwika.com/vocab/solidmemo/0.1/interval', null)[0]?.value, 10),
    front: store.getObjects(iri, 'https://antwika.com/vocab/solidmemo/0.1/front', null)[0]?.value,
    back: store.getObjects(iri, 'https://antwika.com/vocab/solidmemo/0.1/back', null)[0]?.value,
  };
}

export default function useCardDetail(iri: string) {
  const { data: raw } = useSWR(iri, fetcher);
  const [cardDetail, setCardDetail] = useState<CardDetail | undefined>();

  useEffect(() => {
    if (!raw) return;
    setCardDetail(parseCardDetail(iri, raw));
  }, [iri, raw]);

  return { cardDetail, setCardDetail };
}
