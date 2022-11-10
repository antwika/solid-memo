import axios from 'axios';
import { Literal, NamedNode, Parser, Quad, Store } from 'n3';

export type Card = {
  iri: string,
  type: string,
  repetition: number,
  ease: number,
  interval: number,
  front: string,
  back: string,
}

export const fetchResource = async (iri: string) => {
  const response = await axios(iri);
  const { data: resource } = response;
  return resource;
}

export const parseResourceAsStore = async (resource: string) => {
  const parser = new Parser();
  return new Store(parser.parse(resource));
}

/* export const extractAllCardQuadsFromStore = async (store: Store) => {
  const quads = store.getQuads(null, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://antwika.com/vocab/solidmemo/0.1/Card', null);
  const allCardQuads = quads.reduce((acc: Record<string, Quad[]>, q) => {
    acc[q.subject.id] = store.getQuads(q.subject.id, null, null, null);
    return acc;
  }, {});
  return allCardQuads;
}

export const extractCardQuadsFromStore = async (store: Store, cardIri: string) => {
  const cardQuads = store.getQuads(cardIri, null, null, null);
  return cardQuads;
}

export const toCard = async (quads: Quad[]): Promise<Card> => {
  try {
    const store = new Store(quads);
    console.log(store);
    const repetition = +store.getObjects(null, 'http://antwika.com/vocab/solidmemo/0.1/repetition', null)[0].value;
    const ease = +store.getObjects(null, 'http://antwika.com/vocab/solidmemo/0.1/ease', null)[0].value;
    const interval = +store.getObjects(null, 'http://antwika.com/vocab/solidmemo/0.1/interval', null)[0].value;
    const front = store.getObjects(null, 'http://antwika.com/vocab/solidmemo/0.1/front', null)[0].value;
    const back = store.getObjects(null, 'http://antwika.com/vocab/solidmemo/0.1/back', null)[0].value;
    return {
      repetition,
      ease,
      interval,
      front,
      back,
    };
  } catch (err) {
    const errorMessage = 'The provided quads does not conform with expected shape';
    console.error(errorMessage, err);
    throw new Error(errorMessage);
  }
} */

export const addCardToStore = async (store: Store, card: Card) => {
  const temp = new Store();
  temp.addQuad(new NamedNode(card.iri), new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), new NamedNode('http://antwika.com/vocab/solidmemo/0.1/Card'));
  temp.addQuad(new NamedNode(card.iri), new NamedNode('http://antwika.com/vocab/solidmemo/0.1/repetition'), new Literal(`"${card.repetition}"^^http://www.w3.org/2001/XMLSchema#integer`));
  temp.addQuad(new NamedNode(card.iri), new NamedNode('http://antwika.com/vocab/solidmemo/0.1/ease'), new Literal(`"${card.ease}"^^http://www.w3.org/2001/XMLSchema#decimal`));
  temp.addQuad(new NamedNode(card.iri), new NamedNode('http://antwika.com/vocab/solidmemo/0.1/interval'), new Literal(`"${card.interval}"^^http://www.w3.org/2001/XMLSchema#integer`));
  temp.addQuad(new NamedNode(card.iri), new NamedNode('http://antwika.com/vocab/solidmemo/0.1/front'), new Literal(card.front));
  temp.addQuad(new NamedNode(card.iri), new NamedNode('http://antwika.com/vocab/solidmemo/0.1/back'), new Literal(card.back));

  store.addQuads(temp.getQuads(null, null, null, null));
}

export const extractAllCardsFromStore = async (store: Store) => {
  console.log('store', store);
  const subjects = store.getSubjects('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://antwika.com/vocab/solidmemo/0.1/Card', null);
  console.log('subjects', subjects);

  const cards = subjects.map(subject => {
    const type = store.getObjects(subject.id, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', null)[0].value;
    const repetition = +store.getObjects(subject.id, 'http://antwika.com/vocab/solidmemo/0.1/repetition', null)[0].value;
    const ease = +store.getObjects(subject.id, 'http://antwika.com/vocab/solidmemo/0.1/ease', null)[0].value;
    const interval = +store.getObjects(subject.id, 'http://antwika.com/vocab/solidmemo/0.1/interval', null)[0].value;
    const front = store.getObjects(subject.id, 'http://antwika.com/vocab/solidmemo/0.1/front', null)[0].value;
    const back = store.getObjects(subject.id, 'http://antwika.com/vocab/solidmemo/0.1/back', null)[0].value;
    return {
      iri: subject.id,
      type,
      repetition,
      ease,
      interval,
      front,
      back,
    };
  });
  console.log('cards', cards);
  return cards;
}