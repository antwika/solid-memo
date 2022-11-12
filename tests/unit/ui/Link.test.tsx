import { render, screen, within } from '@testing-library/react';
import Link from '@/ui/Link';

describe('Link', () => {
  it('renders children', () => {
    render(
      <Link
        dataTestid='test-link'
        uri='/'
      >
        <span data-testid="test-link-children">Foo</span>
      </Link>
    );
    expect(within(screen.queryByTestId('test-link')!).queryByTestId('test-link-children')).toBeInTheDocument();
  });
});
