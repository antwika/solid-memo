import { randomRange, wait } from "./util";
import {
  Parser as N3Parser,
  Store as N3Store,
} from "n3";

export type Uuid = string;

export type PropertyUuid = Uuid;

export type PropertyData = {
  uuid: PropertyUuid,
  name: string,
  value: string,
};

export type PropertySet = Record<PropertyUuid, PropertyData>;

export type CardUuid = Uuid;

export type CardData = {
  uuid: CardUuid,
  propertyUuidList: PropertyUuid[],
  deckUuidList: DeckUuid[],
};

export type CardSet = Record<CardUuid, CardData>;

export type DeckUuid = Uuid;

export type DeckData = {
  uuid: DeckUuid,
  propertyUuidList: PropertyUuid[],
  cardUuidList: CardUuid[],
  studyUuidList: StudyUuid[],
};

export type DeckSet = Record<DeckUuid, DeckData>;

export type StudyUuid = Uuid;

export type StudyData = {
  uuid: StudyUuid,
  propertyUuidList: PropertyUuid[],
  deckUuidList: DeckUuid[],
};

export type StudySet = Record<StudyUuid, StudyData>;

export type Data = {
  propertySet: PropertySet,
  cardSet: CardSet,
  deckSet: DeckSet,
  studySet: StudySet,
};

export async function getData(): Promise<Data> {
  // await wait(randomRange(10, 50));
  const response = await fetch('http://localhost:4000/alice/solidmemo/data');
  const dataset = await response.text();
  const n3Parser = new N3Parser();
  const n3Store = new N3Store(n3Parser.parse(dataset));
  //console.log('n3Store:', n3Store);
  const properties = n3Store.getSubjects('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://example.org/stuff/1.0/Property', null);
  console.log('properties', properties);
  const cards = n3Store.getSubjects('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://example.org/stuff/1.0/Card', null);
  console.log('cards', cards);
  const decks = n3Store.getSubjects('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://example.org/stuff/1.0/Deck', null);
  console.log('decks', decks);
  const studies = n3Store.getSubjects('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://example.org/stuff/1.0/Study', null);
  console.log('studies', studies);

  return {
    propertySet: {
      '817d1e12-5356-49db-a602-779f80ff7438': {
        uuid: '817d1e12-5356-49db-a602-779f80ff7438',
        name: 'Name',
        value: 'The foo card',
      },
      '6a80fb3b-0863-44db-8fdb-8dcc5b9a438c': {
        uuid: '6a80fb3b-0863-44db-8fdb-8dcc5b9a438c',
        name: 'Front',
        value: 'Foo',
      },
      'fba6a593-e190-4904-88ec-536f4ac62777': {
        uuid: 'fba6a593-e190-4904-88ec-536f4ac62777',
        name: 'Back',
        value: 'Bar',
      },
      'e20bae0a-a2ca-407b-a92e-3fe9ceba0d0d': {
        uuid: 'e20bae0a-a2ca-407b-a92e-3fe9ceba0d0d',
        name: 'Name',
        value: 'The hello card',
      },
      '55e74d88-0348-4828-ab18-16e94e03ee8b': {
        uuid: '55e74d88-0348-4828-ab18-16e94e03ee8b',
        name: 'Front',
        value: 'Hello',
      },
      'e867006c-62e4-465d-88c0-86cc50477355': {
        uuid: 'e867006c-62e4-465d-88c0-86cc50477355',
        name: 'Back',
        value: 'World',
      },
      'de4634d5-f1dc-4670-8a83-d5962543f6d4': {
        uuid: 'de4634d5-f1dc-4670-8a83-d5962543f6d4',
        name: 'Name',
        value: 'The lorem card',
      },
      'f4af369f-d2d0-42e6-84a1-0fb5463d2295': {
        uuid: 'f4af369f-d2d0-42e6-84a1-0fb5463d2295',
        name: 'Front',
        value: 'Lorem',
      },
      '34f76bd8-1137-4979-8907-7e7aa6b33889': {
        uuid: '34f76bd8-1137-4979-8907-7e7aa6b33889',
        name: 'Back',
        value: 'Ipsum',
      },
      '20d61760-4c00-44b1-a7df-ebfdc54e043d': {
        uuid: '20d61760-4c00-44b1-a7df-ebfdc54e043d',
        name: 'Name',
        value: 'The addition card',
      },
      '077ec189-0c93-40fc-b26c-78b8e2a8481e': {
        uuid: '077ec189-0c93-40fc-b26c-78b8e2a8481e',
        name: 'Front',
        value: '1 + 2',
      },
      '217dd6fa-31da-4c9f-94d0-3c3a07f0a1d2': {
        uuid: '217dd6fa-31da-4c9f-94d0-3c3a07f0a1d2',
        name: 'Back',
        value: '3',
      },
      'df731ce4-aa37-4be4-bece-48c85a9bb310': {
        uuid: 'df731ce4-aa37-4be4-bece-48c85a9bb310',
        name: 'Name',
        value: 'The multiplication card',
      },
      'c4e3fa82-0c1a-4a88-af80-395e9527d80a': {
        uuid: 'c4e3fa82-0c1a-4a88-af80-395e9527d80a',
        name: 'Front',
        value: '3 * 3',
      },
      '908a9d91-e7c9-466b-ab7a-764b9814faab': {
        uuid: '908a9d91-e7c9-466b-ab7a-764b9814faab',
        name: 'Back',
        value: '9',
      },
      '14288b2c-827d-43f3-9015-fae47a14d9c4': {
        uuid: '14288b2c-827d-43f3-9015-fae47a14d9c4',
        name: 'Name',
        value: 'Dummy texts',
      },
      '7a1f58c2-798b-45c0-9aec-33c66d60acb8': {
        uuid: '7a1f58c2-798b-45c0-9aec-33c66d60acb8',
        name: 'Name',
        value: 'Mathematics',
      },
      'fa9b356c-7523-498f-be1b-da5cb0e2c8ca': {
        uuid: 'fa9b356c-7523-498f-be1b-da5cb0e2c8ca',
        name: 'Name',
        value: 'My first study',
      },
    },
    cardSet: {
      '19df47aa-38cb-420f-823d-afb6b29682cb': {
        uuid: '19df47aa-38cb-420f-823d-afb6b29682cb',
        propertyUuidList: [
          '817d1e12-5356-49db-a602-779f80ff7438',
          '6a80fb3b-0863-44db-8fdb-8dcc5b9a438c',
          'fba6a593-e190-4904-88ec-536f4ac62777',
        ],
        deckUuidList: ['cf6a58d4-49ba-4956-96da-5081d297133e'],
      },
      '6115f54f-d181-4675-9c00-f8efae7aa417': {
        uuid: '6115f54f-d181-4675-9c00-f8efae7aa417',
        propertyUuidList: [
          'e20bae0a-a2ca-407b-a92e-3fe9ceba0d0d',
          '55e74d88-0348-4828-ab18-16e94e03ee8b',
          'e867006c-62e4-465d-88c0-86cc50477355',
        ],
        deckUuidList: ['cf6a58d4-49ba-4956-96da-5081d297133e'],
      },
      '80388272-a9b2-40a4-95a3-ad1ce5ea5827': {
        uuid: '80388272-a9b2-40a4-95a3-ad1ce5ea5827',
        propertyUuidList: [
          'de4634d5-f1dc-4670-8a83-d5962543f6d4',
          'f4af369f-d2d0-42e6-84a1-0fb5463d2295',
          '34f76bd8-1137-4979-8907-7e7aa6b33889',
        ],
        deckUuidList: ['cf6a58d4-49ba-4956-96da-5081d297133e'],
      },
      '6412151c-00e5-4db6-9631-1fbd9ba65544': {
        uuid: '6412151c-00e5-4db6-9631-1fbd9ba65544',
        propertyUuidList: [
          '20d61760-4c00-44b1-a7df-ebfdc54e043d',
          '077ec189-0c93-40fc-b26c-78b8e2a8481e',
          '217dd6fa-31da-4c9f-94d0-3c3a07f0a1d2',
        ],
        deckUuidList: ['2da5a040-40b8-4279-8da8-d342929415d5'],
      },
      '65ffcd56-bdaa-4840-9e05-3bb234ea35c1': {
        uuid: '65ffcd56-bdaa-4840-9e05-3bb234ea35c1',
        propertyUuidList: [
          'df731ce4-aa37-4be4-bece-48c85a9bb310',
          'c4e3fa82-0c1a-4a88-af80-395e9527d80a',
          '908a9d91-e7c9-466b-ab7a-764b9814faab',
        ],
        deckUuidList: ['2da5a040-40b8-4279-8da8-d342929415d5'],
      },
    },
    deckSet: {
      'cf6a58d4-49ba-4956-96da-5081d297133e': {
        uuid: 'cf6a58d4-49ba-4956-96da-5081d297133e',
        propertyUuidList: [
          '14288b2c-827d-43f3-9015-fae47a14d9c4'
        ],
        cardUuidList: [
          "19df47aa-38cb-420f-823d-afb6b29682cb",
          "6115f54f-d181-4675-9c00-f8efae7aa417",
          "80388272-a9b2-40a4-95a3-ad1ce5ea5827",
        ],
        studyUuidList: [
          '710500c8-4984-4088-a4ca-202244f050d4'
        ],
      },
      '2da5a040-40b8-4279-8da8-d342929415d5': {
        uuid: '2da5a040-40b8-4279-8da8-d342929415d5',
        propertyUuidList: [
          '7a1f58c2-798b-45c0-9aec-33c66d60acb8'
        ],
        cardUuidList: [
          "6412151c-00e5-4db6-9631-1fbd9ba65544",
          "65ffcd56-bdaa-4840-9e05-3bb234ea35c1",
        ],
        studyUuidList: [],
      }
    },
    studySet: {
      '710500c8-4984-4088-a4ca-202244f050d4': {
        uuid: '710500c8-4984-4088-a4ca-202244f050d4',
        propertyUuidList: [
          'fa9b356c-7523-498f-be1b-da5cb0e2c8ca',
        ],
        deckUuidList: [
          'cf6a58d4-49ba-4956-96da-5081d297133e'
        ],
      },
    },
  };
}

export async function getPropertyByUuid(uuid: PropertyUuid) {
  const { propertySet } = await getData();
  return propertySet[uuid];
}

export async function getPropertyByName(propertySet: PropertySet, name: string) {
  const foundProperties = Object.values(propertySet).filter(property => property.name === name).reduce<PropertySet>((set, property) => {
    set[property.uuid] = property;
    return set;
  }, {});

  if (Object.values(foundProperties).length > 1) console.log('Warning! Too many properties found!');

  return foundProperties;
}

export async function getPropertyValueByName(propertySet: PropertySet, name: string) {
  const foundPropertySet = await getPropertyByName(propertySet, name);
  if (Object.values(foundPropertySet).length > 0) {
    return Object.values(foundPropertySet)[0].value;
  }
}

export async function getPropertySetByCardUuid(cardUuid: CardUuid) {
  const { propertySet } = await getData();
  const card = await getCardByUuid(cardUuid);
  const foundPropertySet = card.propertyUuidList.reduce<PropertySet>((set, propertyUuid) => {
    set[propertyUuid] = propertySet[propertyUuid];
    return set;
  }, {});
  return foundPropertySet;
}

export async function getPropertySetByDeckUuid(deckUuid: DeckUuid) {
  const { propertySet } = await getData();
  const deck = await getDeckByUuid(deckUuid);
  const foundPropertySet = deck.propertyUuidList.reduce<PropertySet>((set, propertyUuid) => {
    set[propertyUuid] = propertySet[propertyUuid];
    return set;
  }, {});
  return foundPropertySet;
}

export async function getPropertySetByStudyUuid(studyUuid: StudyUuid) {
  const { propertySet } = await getData();
  const study = await getStudyByUuid(studyUuid);
  const foundPropertySet = study.propertyUuidList.reduce<PropertySet>((set, propertyUuid) => {
    set[propertyUuid] = propertySet[propertyUuid];
    return set;
  }, {});
  return foundPropertySet;
}

export async function getCardByUuid(uuid: CardUuid) {
  const { cardSet } = await getData();
  return cardSet[uuid];
}

export async function getCardSetByPropertyUuid(propertyUuid: DeckUuid) {
  const { cardSet } = await getData();
  
  const foundCardSet: Record<CardUuid, CardData> = {};
  for (const card of Object.values(cardSet)) {
    const hasPropertyUuid = card.propertyUuidList.some(_propertyUuid => _propertyUuid === propertyUuid);
    if (hasPropertyUuid) {
      foundCardSet[card.uuid] = card;
    }
  }

  return foundCardSet;
}

export async function getDeckSetByPropertyUuid(propertyUuid: DeckUuid) {
  const { deckSet } = await getData();
  
  const foundDeckSet: Record<DeckUuid, DeckData> = {};
  for (const deck of Object.values(deckSet)) {
    const hasPropertyUuid = deck.propertyUuidList.some(_propertyUuid => _propertyUuid === propertyUuid);
    if (hasPropertyUuid) {
      foundDeckSet[deck.uuid] = deck;
    }
  }

  return foundDeckSet;
}

export async function getStudySetByPropertyUuid(propertyUuid: StudyUuid) {
  const { studySet } = await getData();
  
  const foundStudySet: Record<StudyUuid, StudyData> = {};
  for (const study of Object.values(studySet)) {
    const hasPropertyUuid = study.propertyUuidList.some(_propertyUuid => _propertyUuid === propertyUuid);
    if (hasPropertyUuid) {
      foundStudySet[study.uuid] = study;
    }
  }

  return foundStudySet;
}

export async function getCardSetByDeckUuid(deckUuid: DeckUuid) {
  const { cardSet } = await getData();
  
  const foundCardSet: Record<CardUuid, CardData> = {};
  for (const card of Object.values(cardSet)) {
    const hasDeckUuid = card.deckUuidList.some(_deckUuid => _deckUuid === deckUuid);
    if (hasDeckUuid) {
      foundCardSet[card.uuid] = card;
    }
  }

  return foundCardSet;
}

export async function getDeckByUuid(uuid: DeckUuid) {
  const { deckSet } = await getData();
  return deckSet[uuid];
}

export async function getDeckSetByCardUuid(cardUuid: StudyUuid) {
  const { deckSet } = await getData();
  
  const foundDeckSet: Record<DeckUuid, DeckData> = {};
  for (const deck of Object.values(deckSet)) {
    const hasCardUuid = deck.cardUuidList.some(_cardUuid => _cardUuid === cardUuid);
    if (hasCardUuid) {
      foundDeckSet[deck.uuid] = deck;
    }
  }

  return foundDeckSet;
}

export async function getDeckSetByStudyUuid(studyUuid: StudyUuid) {
  const { deckSet } = await getData();
  
  const foundDeckSet: Record<DeckUuid, DeckData> = {};
  for (const deck of Object.values(deckSet)) {
    const hasStudyUuid = deck.studyUuidList.some(_studyUuid => _studyUuid === studyUuid);
    if (hasStudyUuid) {
      foundDeckSet[deck.uuid] = deck;
    }
  }

  return foundDeckSet;
}

export async function getStudyByUuid(uuid: StudyUuid) {
  const { studySet } = await getData();
  return studySet[uuid];
}

export async function getStudySetByDeckUuid(deckUuid: DeckUuid) {
  const { studySet } = await getData();

  const foundStudySet: Record<StudyUuid, StudyData> = {};
  for (const study of Object.values(studySet)) {
    const hasDeckUuid = study.deckUuidList.some(_deckUuid => _deckUuid === deckUuid);
    if (hasDeckUuid) {
      foundStudySet[study.uuid] = study;
    }
  }

  return foundStudySet;
}

export async function getStudySetByCardUuid(cardUuid: DeckUuid) {
  const deckSet = await getDeckSetByCardUuid(cardUuid);

  const foundStudySet: Record<StudyUuid, StudyData> = {};
  for (const deck of Object.values(deckSet)) {
    const studySet = await getStudySetByDeckUuid(deck.uuid);
    for (const study of Object.values(studySet)) {
      if (!foundStudySet[study.uuid]) {
        foundStudySet[study.uuid] = study;
      }
    }
  }

  return foundStudySet;
}
