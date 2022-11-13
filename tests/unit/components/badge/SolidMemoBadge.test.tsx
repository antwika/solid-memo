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
});
