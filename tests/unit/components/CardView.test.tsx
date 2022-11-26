import { fireEvent, render, screen, within } from '@testing-library/react';
import CardView from '@/components/CardView';
import * as useCardDetail from '@/hooks/useCardDetail';

jest.mock('@/hooks/useCardDetail');

describe('CardView', () => {
  let useCardDetailSpy: jest.SpyInstance<any, [iri: string]>;

  beforeEach(() => {
    useCardDetailSpy = jest.spyOn(useCardDetail, 'default');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('can render a non-revealed card', () => {
    useCardDetailSpy.mockReturnValue({ cardDetail: undefined, setCardDetail: jest.fn() });

    const onGrade = jest.fn();

    render(
      <CardView
        dataTestid='test-cardView'
        iri='http://test.example.com'
        repetition='1'
        ease='2'
        interval='3'
        front='Front'
        back='Back'
        revealed={false}
        onGrade={(onGrade)}
      />,
    );

    const cardView = screen.queryByTestId('test-cardView');
    expect(cardView).toBeInTheDocument();

    expect(within(cardView!).queryByTestId('test-cardView-againButton')).not.toBeInTheDocument();
    expect(within(cardView!).queryByTestId('test-cardView-hardButton')).not.toBeInTheDocument();
    expect(within(cardView!).queryByTestId('test-cardView-okayButton')).not.toBeInTheDocument();
    expect(within(cardView!).queryByTestId('test-cardView-easyButton')).not.toBeInTheDocument();

    expect(onGrade).not.toHaveBeenCalled();
  });

  it('can render a revealed card', () => {
    useCardDetailSpy.mockReturnValue({ cardDetail: undefined, setCardDetail: jest.fn() });

    const onGrade = jest.fn();

    render(
      <CardView
        dataTestid='test-cardView'
        iri='http://test.example.com'
        repetition='1'
        ease='2'
        interval='3'
        front='Front'
        back='Back'
        revealed={true}
        onGrade={onGrade}
      />,
    );

    const cardView = screen.queryByTestId('test-cardView');
    expect(cardView).toBeInTheDocument();

    expect(within(cardView!).queryByTestId('test-cardView-againButton')).toBeInTheDocument();
    expect(within(cardView!).queryByTestId('test-cardView-hardButton')).toBeInTheDocument();
    expect(within(cardView!).queryByTestId('test-cardView-okayButton')).toBeInTheDocument();
    expect(within(cardView!).queryByTestId('test-cardView-easyButton')).toBeInTheDocument();

    const cardAgainButton = within(cardView!).queryByTestId('test-cardView-againButton');
    expect(cardAgainButton).toBeInTheDocument();
    expect(cardAgainButton).toHaveTextContent('Again');

    const cardHardButton = within(cardView!).queryByTestId('test-cardView-hardButton');
    expect(cardHardButton).toBeInTheDocument();
    expect(cardHardButton).toHaveTextContent('Hard');

    const cardOkayButton = within(cardView!).queryByTestId('test-cardView-okayButton');
    expect(cardOkayButton).toBeInTheDocument();
    expect(cardOkayButton).toHaveTextContent('Okay');

    const cardEasyButton = within(cardView!).queryByTestId('test-cardView-easyButton');
    expect(cardEasyButton).toBeInTheDocument();
    expect(cardEasyButton).toHaveTextContent('Easy');

    fireEvent.click(cardAgainButton!);
    expect(onGrade).toHaveBeenCalledWith(0);

    fireEvent.click(cardHardButton!);
    expect(onGrade).toHaveBeenCalledWith(3);

    fireEvent.click(cardOkayButton!);
    expect(onGrade).toHaveBeenCalledWith(4);

    fireEvent.click(cardEasyButton!);
    expect(onGrade).toHaveBeenCalledWith(5);
  });
});
