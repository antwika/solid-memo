import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import EditableCard from '@/components/EditableCard';
import * as useCardDetail from '@/hooks/useCardDetail';
import * as sm2 from '@/lib/sm2';

jest.mock('@/hooks/useCardDetail');
jest.mock('@/lib/sm2');

describe('EditableCard', () => {
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
      <EditableCard dataTestid='test-editableCard' iri='http://test.example.com' />,
    );

    const card = screen.queryByTestId('test-editableCard');
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
      <EditableCard dataTestid='test-editableCard' iri='http://test.example.com' />,
    );

    const editableCard = screen.queryByTestId('test-editableCard');
    expect(editableCard).toBeInTheDocument();

    const revealButton = within(editableCard!).queryByTestId('test-editableCard-revealButton');
    expect(revealButton).toBeInTheDocument();
    expect(revealButton).toHaveTextContent('Reveal');

    fireEvent.click(revealButton!);

    expect(revealButton).toHaveTextContent('Hide');

    const sm2Spy = jest.spyOn(sm2, 'sm2');
    sm2Spy.mockReturnValue({ ease: 123, interval: 123, repetition: 123 });

    const cardAgainButton = within(editableCard!).queryByTestId('test-editableCard-cardView-againButton');
    expect(cardAgainButton).toBeInTheDocument();

    fireEvent.click(cardAgainButton!);

    expect(sm2Spy).toHaveBeenCalledWith({
      ease: expect.any(Number),
      grade: 0,
      interval: expect.any(Number),
      repetition: expect.any(Number),
    });

    const cardHardButton = within(editableCard!).queryByTestId('test-editableCard-cardView-hardButton');
    expect(cardHardButton).toBeInTheDocument();

    fireEvent.click(cardHardButton!);

    expect(sm2Spy).toHaveBeenCalledWith({
      ease: expect.any(Number),
      grade: 3,
      interval: expect.any(Number),
      repetition: expect.any(Number),
    });

    const cardOkayButton = within(editableCard!).queryByTestId('test-editableCard-cardView-okayButton');
    expect(cardOkayButton).toBeInTheDocument();

    fireEvent.click(cardOkayButton!);

    expect(sm2Spy).toHaveBeenCalledWith({
      ease: expect.any(Number),
      grade: 4,
      interval: expect.any(Number),
      repetition: expect.any(Number),
    });

    const cardEasyButton = within(editableCard!).queryByTestId('test-editableCard-cardView-easyButton');
    expect(cardEasyButton).toBeInTheDocument();

    fireEvent.click(cardEasyButton!);

    expect(sm2Spy).toHaveBeenCalledWith({
      ease: expect.any(Number),
      grade: 5,
      interval: expect.any(Number),
      repetition: expect.any(Number),
    });

    fireEvent.click(revealButton!);

    expect(revealButton).toHaveTextContent('Reveal');

    const editModeButton = within(editableCard!).queryByTestId('test-editableCard-editModeButton');
    expect(editModeButton).toBeInTheDocument();
    expect(editModeButton).toHaveTextContent('Activate edit mode');

    fireEvent.click(editModeButton!);

    expect(editModeButton).toHaveTextContent('Deactivate edit mode');

    const cardForm = within(editableCard!).queryByTestId('test-editableCard-cardForm-form');
    fireEvent.submit(cardForm!);

    fireEvent.click(editModeButton!);

    expect(editModeButton).toHaveTextContent('Activate edit mode');
  });
});
