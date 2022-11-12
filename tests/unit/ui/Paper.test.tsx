import { render, screen, within } from '@testing-library/react';
import Paper from '@/ui/Paper';

describe('Paper', () => {
  it('renders children', () => {
    render(
      <Paper
        dataTestid='test-paper'
      >
        <span data-testid="test-paper-children">Foo</span>
      </Paper>
    );
    expect(within(screen.queryByTestId('test-paper')!).queryByTestId('test-paper-children')).toBeInTheDocument();
  });
});
