import { CardData, CardUuid, Data, DeckData, DeckUuid, PropertyData, PropertyUuid, StudyData, StudyUuid } from '@/lib/mockData';
import { QueryEngine } from '@comunica/query-sparql';
import {
  Store as N3Store,
} from "n3";

export const fun = async () => {
  const queryEngine = new QueryEngine();
  
  const quadStream = await queryEngine.queryQuads(`
    CONSTRUCT WHERE {
      ?s ?p ?o
    } LIMIT 100`, {
    sources: ['http://localhost:4000/alice/solidmemo/data'],
  });

  const data: Data = { 
    propertySet: {},
    cardSet: {},
    deckSet: {},
    studySet: {},
  };
  
  const quads = await quadStream.toArray();
  const n3Store = new N3Store(quads);

  for (const quad of quads) {
    const { subject, predicate, object, graph } = quad;
    /* console.log({
      subject: subject.value,
      predicate: predicate.value,
      object: object.value,
      graph: graph.value,
    }); */

    switch (object.value) {
      case 'http://example.org/Property':
        data.propertySet[subject.value] = {
          uuid: subject.value,
        } as any;
        break;
      case 'http://example.org/Card':
        data.cardSet[subject.value] = {
          uuid: subject.value,
        } as any;
        break;
      case 'http://example.org/Deck':
        data.deckSet[subject.value] = {
          uuid: subject.value,
        } as any;
        break;
      case 'http://example.org/Study':
        data.studySet[subject.value] = {
          uuid: subject.value,
        } as any;
        break;
      default:
        console.log('Unknown type:', object.value);
        break;
    }
  }

  console.log('Loaded data');
};

describe('Comunica', () => {
  it('tests', async () => {
    await fun();
    expect(1).toBe(2);
  });
});
