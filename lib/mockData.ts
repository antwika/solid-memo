import { randomRange, wait } from "./util";

export type CardKey = string;

export type CardData = {
  key: CardKey,
  front: string,
  back: string,
};

export type DeckKey = string;

export type DeckData = {
  key: DeckKey,
  name: string,
  cards: CardKey[],
};

type Data = {
  cards: Record<string, CardData>,
  decks: Record<string, DeckData>,
};

export async function getData(): Promise<Data> {
  await wait(randomRange(20, 250));
  return {
    cards: {
      '19df47aa-38cb-420f-823d-afb6b29682cb': {
        key: '19df47aa-38cb-420f-823d-afb6b29682cb',
        front: 'Foo',
        back: 'Bar',
      },
      '6115f54f-d181-4675-9c00-f8efae7aa417': {
        key: '6115f54f-d181-4675-9c00-f8efae7aa417',
        front: 'Hello',
        back: 'World',
      },
      '80388272-a9b2-40a4-95a3-ad1ce5ea5827': {
        key: '80388272-a9b2-40a4-95a3-ad1ce5ea5827',
        front: 'Lorem',
        back: 'Ipsum',
      },
      '6412151c-00e5-4db6-9631-1fbd9ba65544': {
        key: '6412151c-00e5-4db6-9631-1fbd9ba65544',
        front: '1+2',
        back: '3',
      },
      '65ffcd56-bdaa-4840-9e05-3bb234ea35c1': {
        key: '65ffcd56-bdaa-4840-9e05-3bb234ea35c1',
        front: '3*3',
        back: '9',
      },
    },
    decks: {
      'cf6a58d4-49ba-4956-96da-5081d297133e': {
        key: 'cf6a58d4-49ba-4956-96da-5081d297133e',
        name: "Dummy texts",
        cards: [
          "19df47aa-38cb-420f-823d-afb6b29682cb",
          "6115f54f-d181-4675-9c00-f8efae7aa417",
          "80388272-a9b2-40a4-95a3-ad1ce5ea5827",
        ],
      },
      '2da5a040-40b8-4279-8da8-d342929415d5': {
        key: '2da5a040-40b8-4279-8da8-d342929415d5',
        name: "Mathematics",
        cards: [
          "6412151c-00e5-4db6-9631-1fbd9ba65544",
          "65ffcd56-bdaa-4840-9e05-3bb234ea35c1",
        ],
      }
    },
  };
}

export async function getCardById(id: string) {
  const { cards } = await getData();
  return cards[id];
}

export async function getDeckById(id: string) {
  const { decks } = await getData();
  return decks[id];
}
