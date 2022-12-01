import { render, screen, within } from '@testing-library/react';
import Loading from '@/app/resource/loading';

const Spinner = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/components/Spinner', () => (props: any) => Spinner(props));

describe('Loading', () => {
  it('renders', () => {
    render(
      <Loading />,
    );

    const loading = screen.queryByTestId('test-loading');
    expect(loading).toBeInTheDocument();

    const loadingSpinner = within(loading!).queryByTestId('test-loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
    expect(Spinner).toHaveBeenCalledWith(
      expect.objectContaining({
        dataTestid: 'test-loading-spinner',
        label: 'Loading resources...',
      }),
    );
  });
});
