import { render, screen, within } from '@testing-library/react';
import SolidMemoBadge from '@/components/badge/SolidMemoBadge';

jest.mock('@/hooks/useWebID');

describe('SolidMemoBadge', () => {
  it('renders a badge that has a logotype image and text "Solid Memo"', () => {
    render(
      <SolidMemoBadge dataTestid='test-solidMemoBadge' />
    );
    
    const solidMemoBadge = screen.queryByTestId('test-solidMemoBadge');
    expect(solidMemoBadge).toBeInTheDocument();

    const solidMemoBadgeImage = within(solidMemoBadge!).queryByTestId('test-solidMemoBadge-image');
    expect(solidMemoBadgeImage).toBeInTheDocument();
    expect(solidMemoBadgeImage).toHaveAttribute('src', '/logo.svg');

    const solidMemoBadgeText = within(solidMemoBadge!).queryByTestId('test-solidMemoBadge-text');
    expect(solidMemoBadgeText).toBeInTheDocument();
    expect(solidMemoBadgeText).toHaveTextContent('Solid Memo')
  });
/*
  it('does not render an "unlock" icon', () => {
    render(
      <SolidMemoBadge dataTestid='test-sessionBadge' />
    );

    const sessionBadge = screen.queryByTestId('test-sessionBadge');
    expect(sessionBadge).toBeInTheDocument();
    
    const sessionBadgeIconLock = within(sessionBadge!).queryByTestId('test-sessionBadge-icon-lock');
    expect(sessionBadgeIconLock).not.toBeInTheDocument();
  });

  it('renders the text returned by the useWebID hook: "http://example.com/test/profile/card#me"', () => {
    render(
      <SolidMemoBadge dataTestid='test-sessionBadge' />
    );

    const sessionBadge = screen.queryByTestId('test-sessionBadge');
    expect(sessionBadge).toBeInTheDocument();
    
    const sessionBadgeText = within(sessionBadge!).queryByTestId('test-sessionBadge-text');
    expect(sessionBadgeText).toBeInTheDocument();
    expect(sessionBadgeText).toHaveTextContent('http://example.com/test/profile/card#me');
  }); */
});
