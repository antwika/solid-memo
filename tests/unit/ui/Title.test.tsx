import { render, screen, within } from '@testing-library/react';
import Title from '@/ui/Title';

describe('Home', () => {
  it('can render a title w/o icon', () => {
    render(<Title dataTestid='test-title' text="Test title" />);
    expect(screen.queryByTestId('test-title')).toBeInTheDocument();
    expect(screen.queryByTestId('test-title-text')).toBeInTheDocument();
    expect(screen.queryByTestId('test-title-text')).toHaveTextContent('Test title');
    expect(screen.queryByTestId('test-title-icon')).not.toBeInTheDocument();
  });

  it('can render a title w/ icon', () => {
    render(<Title dataTestid='test-title' text="Test title" icon={<span data-testid="test-icon">Icon</span>} />);
    expect(screen.queryByTestId('test-title')).toBeInTheDocument();
    expect(screen.queryByTestId('test-title-text')).toBeInTheDocument();
    expect(screen.queryByTestId('test-title-text')).toHaveTextContent('Test title');
    expect(screen.queryByTestId('test-title-icon')).toBeInTheDocument();
    expect(within(screen.queryByTestId('test-title-icon')!).queryByTestId('test-icon')).toBeInTheDocument();
  });
});
