import NextAuthSessionProvider from '@/components/NextAuthSessionProvider';
import { render, screen } from '@testing-library/react';

const SessionProvider = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('next-auth/react', () => ({
  SessionProvider: (props: any) => SessionProvider(props),
}));

describe('NextAuthSessionProvider', () => {
  it('renders', () => {
    render(
      <NextAuthSessionProvider dataTestid='test-nextAuthSessionProvider'>
        []
      </NextAuthSessionProvider>,
    );

    expect(SessionProvider).toHaveBeenCalledTimes(1);
    expect(SessionProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
        session: undefined,
      }),
    );

    const nextAuthSessionProvider = screen.queryByTestId('test-nextAuthSessionProvider');
    expect(nextAuthSessionProvider).toBeInTheDocument();
  });
});
