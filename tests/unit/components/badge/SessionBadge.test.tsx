import { render, screen, within } from '@testing-library/react';
import SessionBadge from '@/components/badge/SessionBadge';
import * as useWebID from '@/hooks/useWebID';

jest.mock('@/hooks/useWebID');

describe('SessionBadge', () => {
  describe('session logged in', () => {
    beforeEach(() => {
      const useWebIDSpy = jest.spyOn(useWebID, 'default');
      useWebIDSpy.mockReturnValue('http://example.com/test/profile/card#me');
    });

    afterEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('renders a "lock" icon', () => {
      render(
        <SessionBadge dataTestid='test-sessionBadge' />
      );

      const sessionBadge = screen.queryByTestId('test-sessionBadge');
      expect(sessionBadge).toBeInTheDocument();
      
      const sessionBadgeIconUnlock = within(sessionBadge!).queryByTestId('test-sessionBadge-icon-unlock');
      expect(sessionBadgeIconUnlock).toBeInTheDocument();
    });

    it('does not render an "unlock" icon', () => {
      render(
        <SessionBadge dataTestid='test-sessionBadge' />
      );

      const sessionBadge = screen.queryByTestId('test-sessionBadge');
      expect(sessionBadge).toBeInTheDocument();
      
      const sessionBadgeIconLock = within(sessionBadge!).queryByTestId('test-sessionBadge-icon-lock');
      expect(sessionBadgeIconLock).not.toBeInTheDocument();
    });

    it('renders the text returned by the useWebID hook: "http://example.com/test/profile/card#me"', () => {
      render(
        <SessionBadge dataTestid='test-sessionBadge' />
      );

      const sessionBadge = screen.queryByTestId('test-sessionBadge');
      expect(sessionBadge).toBeInTheDocument();
      
      const sessionBadgeText = within(sessionBadge!).queryByTestId('test-sessionBadge-text');
      expect(sessionBadgeText).toBeInTheDocument();
      expect(sessionBadgeText).toHaveTextContent('http://example.com/test/profile/card#me');
    });
  });

  describe('session not logged in', () => {
    it('renders an "unlock" icon', () => {
      render(
        <SessionBadge dataTestid='test-sessionBadge' />
      );

      const sessionBadge = screen.queryByTestId('test-sessionBadge');
      expect(sessionBadge).toBeInTheDocument();
      
      const sessionBadgeIconLock = within(sessionBadge!).queryByTestId('test-sessionBadge-icon-lock');
      expect(sessionBadgeIconLock).toBeInTheDocument();
    });

    it('does not render a "lock" icon', () => {
      render(
        <SessionBadge dataTestid='test-sessionBadge' />
      );

      const sessionBadge = screen.queryByTestId('test-sessionBadge');
      expect(sessionBadge).toBeInTheDocument();
      
      const sessionBadgeIconUnlock = within(sessionBadge!).queryByTestId('test-sessionBadge-icon-unlock');
      expect(sessionBadgeIconUnlock).not.toBeInTheDocument();
    });

    it('renders text "Not logged in"', () => {
      render(
        <SessionBadge dataTestid='test-sessionBadge' />
      );

      const sessionBadge = screen.queryByTestId('test-sessionBadge');
      expect(sessionBadge).toBeInTheDocument();
      
      const sessionBadgeText = within(sessionBadge!).queryByTestId('test-sessionBadge-text');
      expect(sessionBadgeText).toBeInTheDocument();
      expect(sessionBadgeText).toHaveTextContent('Not logged in');
    });
  });
});
