import { render, screen, within } from '@testing-library/react';
import Notice, { NoticeType } from '@/ui/Notice';

describe('Notice', () => {
  it.each([
    { type: 'info', expected: { containerStyle: 'bg-blue-200 border-2 border-blue-500', iconContainerStyle: 'bg-blue-500' } },
    { type: 'warning', expected: { containerStyle: 'bg-yellow-200 border-2 border-yellow-500', iconContainerStyle: 'bg-yellow-500' } },
    { type: 'error', expected: { containerStyle: 'bg-red-200 border-2 border-red-500', iconContainerStyle: 'bg-red-500' } },
  ])('renders "$type" with correct container style: $expected', ({ type, expected }) => {
    render(
      <Notice
        dataTestid='test-notice'
        type={type as NoticeType}
      >
        <span data-testid="test-notice-children">Foo</span>
      </Notice>
    );

    expect(within(screen.queryByTestId('test-notice')!).queryByTestId('test-notice-children')).toBeInTheDocument();
    expect(screen.queryByTestId('test-notice')).toHaveClass(expected.containerStyle);
    expect(screen.queryByTestId('test-notice-icon-container')).toHaveClass(expected.iconContainerStyle);
  });
});
