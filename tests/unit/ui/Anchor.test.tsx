import { render, screen, within } from '@testing-library/react';
import Anchor from '@/ui/Anchor';

describe('Anchor', () => {
  it('renders children', () => {
    render(
      <Anchor
        dataTestid='test-anchor'
        href='/'
      >
        <span data-testid="test-anchor-children">Foo</span>
      </Anchor>
    );
    expect(within(screen.queryByTestId('test-anchor')!).queryByTestId('test-anchor-children')).toBeInTheDocument();
  });
});
