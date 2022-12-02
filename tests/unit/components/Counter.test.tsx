import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import Counter from '@/components/Counter';
import * as libStore from '@/lib/store';

jest.mock('@/lib/store');

const Badge = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/ui/Badge', () => (props: any) => Badge(props));

describe('Counter', () => {
  let useAppSelectorSpy: jest.SpyInstance<any, []>;
  let useAppDispatchSpy: jest.SpyInstance<any, []>;

  beforeEach(() => {
    useAppSelectorSpy = jest.spyOn(libStore, 'useAppSelector') as any;
    useAppDispatchSpy = jest.spyOn(libStore, 'useAppDispatch');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('renders', () => {
    useAppSelectorSpy.mockReturnValueOnce(0);
    useAppDispatchSpy.mockImplementation(() => () => jest.fn());
    render(
      <Counter dataTestid='test-counter' />,
    );

    const counter = screen.queryByTestId('test-counter');
    expect(counter).toBeInTheDocument();

    const counterDecrementButton = within(counter!).queryByTestId('test-counter-decrementButton');
    expect(counterDecrementButton).toBeInTheDocument();
    expect(counterDecrementButton).toHaveTextContent('Decrement');

    const counterBadge = within(counter!).queryByTestId('test-counter-badge');
    expect(counterBadge).toBeInTheDocument();
    expect(counterBadge).toHaveTextContent('0');

    const counterIncrementButton = within(counter!).queryByTestId('test-counter-incrementButton');
    expect(counterIncrementButton).toBeInTheDocument();
    expect(counterIncrementButton).toHaveTextContent('Increment');

    fireEvent.click(counterIncrementButton!);
    fireEvent.click(counterDecrementButton!);
  });
});
