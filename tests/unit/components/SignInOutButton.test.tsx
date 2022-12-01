import { fireEvent, render, screen } from '@testing-library/react';
import SignInOutButton from '@/components/SignInOutButton';
import * as useWebID from '@/hooks/useWebID';
import * as nextAuthReact from 'next-auth/react';

jest.mock('@/hooks/useWebID');
jest.mock('next-auth/react');

describe('SignInOutButton', () => {
  let useWebIDSpy: jest.SpyInstance<any, []>;

  beforeEach(() => {
    useWebIDSpy = jest.spyOn(useWebID, 'default');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('renders a "Sign in" button if session is unauthenticated', () => {
    useWebIDSpy.mockReturnValueOnce(undefined);
    render(
      <SignInOutButton dataTestid='test-signInOutButton' />,
    );

    const signInOutButton = screen.queryByTestId('test-signInOutButton');
    expect(signInOutButton).toBeInTheDocument();
    expect(signInOutButton).toHaveTextContent('Sign in');

    fireEvent.click(signInOutButton!);
    expect(nextAuthReact.signIn).toHaveBeenCalledTimes(1);
    expect(nextAuthReact.signOut).not.toHaveBeenCalled();
  });

  it('renders a "Sign out" button if session is authenticated', () => {
    useWebIDSpy.mockReturnValueOnce('http://example.com/test/profile/card#me');
    render(
      <SignInOutButton dataTestid='test-signInOutButton' />,
    );

    const signInOutButton = screen.queryByTestId('test-signInOutButton');
    expect(signInOutButton).toBeInTheDocument();
    expect(signInOutButton).toHaveTextContent('Sign out');

    fireEvent.click(signInOutButton!);
    expect(nextAuthReact.signOut).toHaveBeenCalledTimes(1);
    expect(nextAuthReact.signIn).not.toHaveBeenCalled();
  });
});
