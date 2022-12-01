import { render, screen, within } from '@testing-library/react';
import Badge from '@/ui/Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(
      <Badge
        dataTestid='test-paper'
      >
        <span data-testid="test-paper-children">Foo</span>
      </Badge>,
    );
    expect(within(screen.queryByTestId('test-paper')!).queryByTestId('test-paper-children')).toBeInTheDocument();
  });
});
