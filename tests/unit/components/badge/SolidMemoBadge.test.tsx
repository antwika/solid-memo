import { render, screen, within } from '@testing-library/react';
import SolidMemoBadge from '@/components/badge/SolidMemoBadge';

var Badge = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/ui/Badge', () => (props: any) => Badge(props));

var Image = jest.fn((props) => (
  <div data-testid={props['data-testid'] || props.dataTestid}>{props.children}</div>
));
jest.mock('next/image', () => (props: any) => Image(props));

jest.mock('@next/font/local', () => () => ({ className: 'className'}));

describe('SessionMemoBadge', () => {
  let sessionMemoBadge: HTMLElement;

  beforeEach(() => {
    render(<SolidMemoBadge dataTestid='test-solidMemoBadge' />);
    sessionMemoBadge = screen.queryByTestId('test-solidMemoBadge')!;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a <Badge> component with expected attributes', () => {
    expect(sessionMemoBadge).toBeInTheDocument();
    expect(Badge).toHaveBeenCalledTimes(1);
    expect(Badge).toHaveBeenCalledWith(
      expect.objectContaining({
        dataTestid: 'test-solidMemoBadge',
        children: expect.any(Array),
        className: 'className',
      }),
    );
  });

  it('renders a nested <Image> component with expected attributes', () => {
    expect(Image).toHaveBeenCalledTimes(1);
    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        alt: 'Solid Memo logotype',
        className: 'rounded-lg',
        src: '/logo.svg',
        width: '32',
        height: '32',
      }),
    );
    const childImage = within(sessionMemoBadge).queryByTestId('test-solidMemoBadge-image');
    expect(childImage).toBeInTheDocument();
  });

  it('renders a nested <span> element with expected attributes', () => {
    const childText = within(sessionMemoBadge).queryByTestId('test-solidMemoBadge-text');
    expect(childText).toBeInTheDocument();
    expect(childText).toHaveClass('className');
    expect(childText).toHaveTextContent('Solid Memo');
  });
});
