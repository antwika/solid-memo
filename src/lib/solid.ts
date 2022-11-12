import axios from 'axios';
import { Literal, NamedNode, Parser, Store } from 'n3';
import { getClientEnv } from 'src/lib/env';

export const registerClient = async (idpBaseUrl: string) => {
  const body = {
    client_name: 'Solid Memo',
    application_type: 'web',
    redirect_uris: [new URL('/api/auth/callback/solid', getClientEnv().NEXT_PUBLIC_BASE_URL).toString()],
    subject_type: 'public',
    token_endpoint_auth_method: 'client_secret_basic',
    id_token_signed_response_alg: 'ES256',
    grant_types: ['authorization_code', 'refresh_token'],
  };

  const response = await axios(new URL('.oidc/reg', idpBaseUrl).toString(), {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data: body,
  });
  
  const options = {
    clientId: response.data.client_id,
    clientSecret: response.data.client_secret,
  };

  return options;
};

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

export const addCardToStore = async (store: Store, card: Card) => {
  const temp = new Store();
  temp.addQuad(new NamedNode(card.iri), new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), new NamedNode('https://antwika.com/vocab/solidmemo/0.1/Card'));
  temp.addQuad(new NamedNode(card.iri), new NamedNode('https://antwika.com/vocab/solidmemo/0.1/repetition'), new Literal(`"${card.repetition}"^^http://www.w3.org/2001/XMLSchema#integer`));
  temp.addQuad(new NamedNode(card.iri), new NamedNode('https://antwika.com/vocab/solidmemo/0.1/ease'), new Literal(`"${card.ease}"^^http://www.w3.org/2001/XMLSchema#decimal`));
  temp.addQuad(new NamedNode(card.iri), new NamedNode('https://antwika.com/vocab/solidmemo/0.1/interval'), new Literal(`"${card.interval}"^^http://www.w3.org/2001/XMLSchema#integer`));
  temp.addQuad(new NamedNode(card.iri), new NamedNode('https://antwika.com/vocab/solidmemo/0.1/front'), new Literal(card.front));
  temp.addQuad(new NamedNode(card.iri), new NamedNode('https://antwika.com/vocab/solidmemo/0.1/back'), new Literal(card.back));

  store.addQuads(temp.getQuads(null, null, null, null));
}

export const extractAllCardsFromStore = async (store: Store) => {
  const subjects = store.getSubjects('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'https://antwika.com/vocab/solidmemo/0.1/Card', null);
  const cards = subjects.map(subject => {
    const type = store.getObjects(subject.id, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', null)[0].value;
    const repetition = +store.getObjects(subject.id, 'https://antwika.com/vocab/solidmemo/0.1/repetition', null)[0].value;
    const ease = +store.getObjects(subject.id, 'https://antwika.com/vocab/solidmemo/0.1/ease', null)[0].value;
    const interval = +store.getObjects(subject.id, 'https://antwika.com/vocab/solidmemo/0.1/interval', null)[0].value;
    const front = store.getObjects(subject.id, 'https://antwika.com/vocab/solidmemo/0.1/front', null)[0].value;
    const back = store.getObjects(subject.id, 'https://antwika.com/vocab/solidmemo/0.1/back', null)[0].value;
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