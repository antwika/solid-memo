import { fireEvent, render, screen, within } from '@testing-library/react';
import Card from "@/components/Card";
import * as useCardDetail from '@/hooks/useCardDetail';
import * as sm2 from '@/lib/sm2';

jest.mock('@/hooks/useCardDetail');
jest.mock('@/lib/sm2');

describe('Card', () => {
  let useCardDetailSpy: jest.SpyInstance<any, [iri: string]>;
  // let sm2Spy: jest.SpyInstance<any, []>;

  beforeEach(() => {
    useCardDetailSpy = jest.spyOn(useCardDetail, 'default');
  });
  
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('renders a loading text while the card is being fetched', () => {
    useCardDetailSpy.mockReturnValue({ cardDetail: undefined, setCardDetail: jest.fn() });

    render(
      <Card dataTestid='test-card' iri='http://test.example.com' />
    );
    
    const card = screen.queryByTestId('test-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Loading card...');
  });

  it('renders the card content', () => {
    useCardDetailSpy.mockReturnValue({
      cardDetail: {
        repetition: 123,
        ease: 123,
        interval: 123,
        front: '123',
        back: '123',
      },
      setCardDetail: jest.fn(),
    });

    render(
      <Card dataTestid='test-card' iri='http://test.example.com' />
    );
    
    const card = screen.queryByTestId('test-card');
    expect(card).toBeInTheDocument();

    expect(within(card!).queryByTestId('test-card-againButton')).not.toBeInTheDocument();
    expect(within(card!).queryByTestId('test-card-hardButton')).not.toBeInTheDocument();
    expect(within(card!).queryByTestId('test-card-okayButton')).not.toBeInTheDocument();
    expect(within(card!).queryByTestId('test-card-easyButton')).not.toBeInTheDocument();
    
    const cardRevealButton = within(card!).queryByTestId('test-card-revealButton');
    expect(cardRevealButton).toBeInTheDocument();
    expect(cardRevealButton).toHaveTextContent('Reveal');
    fireEvent.click(cardRevealButton!);

    const cardAgainButton = within(card!).queryByTestId('test-card-againButton');
    expect(cardAgainButton).toBeInTheDocument();
    expect(cardAgainButton).toHaveTextContent('Again');

    const cardHardButton = within(card!).queryByTestId('test-card-hardButton');
    expect(cardHardButton).toBeInTheDocument();
    expect(cardHardButton).toHaveTextContent('Hard');

    const cardOkayButton = within(card!).queryByTestId('test-card-okayButton');
    expect(cardOkayButton).toBeInTheDocument();
    expect(cardOkayButton).toHaveTextContent('Okay');

    const cardEasyButton = within(card!).queryByTestId('test-card-easyButton');
    expect(cardEasyButton).toBeInTheDocument();
    expect(cardEasyButton).toHaveTextContent('Easy');

    const sm2Spy = jest.spyOn(sm2, 'sm2');
    sm2Spy.mockReturnValue({ ease: 123, interval: 123, repetition: 123 });

    fireEvent.click(cardAgainButton!);
    expect(sm2Spy).toHaveBeenCalledWith({
      ease: expect.any(Number),
      grade: 0,
      interval: expect.any(Number),
      repetition: expect.any(Number),
    });

    fireEvent.click(cardHardButton!);
    expect(sm2Spy).toHaveBeenCalledWith({
      ease: expect.any(Number),
      grade: 3,
      interval: expect.any(Number),
      repetition: expect.any(Number),
    });

    fireEvent.click(cardOkayButton!);
    expect(sm2Spy).toHaveBeenCalledWith({
      ease: expect.any(Number),
      grade: 4,
      interval: expect.any(Number),
      repetition: expect.any(Number),
    });

    fireEvent.click(cardEasyButton!);
    expect(sm2Spy).toHaveBeenCalledWith({
      ease: expect.any(Number),
      grade: 5,
      interval: expect.any(Number),
      repetition: expect.any(Number),
    });
  });
});
