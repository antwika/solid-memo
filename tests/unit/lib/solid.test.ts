import { addCardToStore, Card, extractAllCardsFromStore, fetchResource, parseResourceAsStore } from "@/lib/solid";

describe('solid', () => {
  it('can read data from pod', async () => {
    const resource = await fetchResource('http://localhost:4000/alice/solidmemo/data');
    expect(resource).toBeDefined();

    const store = await parseResourceAsStore(resource);
    expect(store).toBeDefined();

    const cards = await extractAllCardsFromStore(store);

    /* const allCardQuads = await extractAllCardQuadsFromStore(store);
    expect(allCardQuads).toBeDefined();
    expect(Object.keys(allCardQuads)).toHaveLength(2);

    const firstCardIri = Object.keys(allCardQuads)[0];
    const firstCardQuads = await extractCardQuadsFromStore(store, firstCardIri);
    expect(firstCardQuads).toBeDefined();

    const firstCard = await toCard(firstCardQuads);
    expect(firstCard).toStrictEqual<Card>({
      repetition: 0,
      ease: 2.5,
      interval: 1,
      front: 'Foo',
      back: 'Bar',
    }); */
  });

  it('can add a card to the store', async () => {
    const resource = '';
    const store = await parseResourceAsStore(resource);
    expect(store).toBeDefined();

    const card: Card = {
      iri: 'http://localhost:4000/alice/solidmemo/data#19df47aa',
      type: 'http://antwika.com/vocab/solidmemo/0.1/Card',
      repetition: 0,
      ease: 2.5,
      interval: 1,
      front: 'Foo',
      back: 'Bar'
    };
    await addCardToStore(store, card);
    
    const cards = await extractAllCardsFromStore(store);
    expect(cards).toHaveLength(1);
    expect(cards[0]).toStrictEqual(card);
  });
  
  it('does not fail when adding the same card multiple times', async () => {
    const resource = '';
    const store = await parseResourceAsStore(resource);
    expect(store).toBeDefined();

    const card: Card = {
      iri: 'http://localhost:4000/alice/solidmemo/data#19df47aa',
      type: 'http://antwika.com/vocab/solidmemo/0.1/Card',
      repetition: 0,
      ease: 2.5,
      interval: 1,
      front: 'Foo',
      back: 'Bar'
    };
    await addCardToStore(store, card);
    await addCardToStore(store, card);
    
    const cards = await extractAllCardsFromStore(store);
    expect(cards).toHaveLength(1);
    expect(cards[0]).toStrictEqual(card);
  });
  
  it('can update existing cards', async () => {
    const resource = '';
    const store = await parseResourceAsStore(resource);
    expect(store).toBeDefined();

    const card: Card = {
      iri: 'http://localhost:4000/alice/solidmemo/data#19df47aa',
      type: 'http://antwika.com/vocab/solidmemo/0.1/Card',
      repetition: 0,
      ease: 2.5,
      interval: 1,
      front: 'Foo',
      back: 'Bar'
    };
    await addCardToStore(store, card);
    
    const updatedCard: Card = {
      iri: 'http://localhost:4000/alice/solidmemo/data#19df47aa',
      type: 'http://antwika.com/vocab/solidmemo/0.1/Card',
      repetition: 1,
      ease: 3.5,
      interval: 3,
      front: 'Foo',
      back: 'Bar'
    };
    await addCardToStore(store, updatedCard);
    
    const cards = await extractAllCardsFromStore(store);
    expect(cards).toHaveLength(1);
    expect(cards[0]).toStrictEqual(updatedCard);
  });
});
