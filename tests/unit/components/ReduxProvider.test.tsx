import ReduxProvider from '@/components/ReduxProvider';
import { render, screen } from '@testing-library/react';

jest.mock('@/lib/store', () => 'mockedStore');

const Provider = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('react-redux', () => ({
  Provider: (props: any) => Provider(props),
}));

describe('ReduxProvider', () => {
  it('renders', () => {
    render(
      <ReduxProvider dataTestid='test-reduxProvider'>
        []
      </ReduxProvider>,
    );

    expect(Provider).toHaveBeenCalledTimes(1);
    expect(Provider).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
        store: 'mockedStore',
      }),
    );

    const reduxProvider = screen.queryByTestId('test-reduxProvider');
    expect(reduxProvider).toBeInTheDocument();
  });
});
