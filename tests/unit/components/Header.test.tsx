import { render, screen, within } from '@testing-library/react';
import Header from "@/components/Header";

var SessionBadge = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/components/badge/SessionBadge', () => (props: any) => SessionBadge(props));

var SolidMemoBadge = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/components/badge/SolidMemoBadge', () => (props: any) => SolidMemoBadge(props));

var Link = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/ui/Link', () => (props: any) => Link(props));

describe('Header', () => {
  it('renders', () => {
    render(
      <Header dataTestid='test-header' />
    );
    
    const header = screen.queryByTestId('test-header');
    expect(header).toBeInTheDocument();
    
    const headerSolidMemoBadge = within(header!).queryByTestId('test-header-solidMemoBadge');
    expect(headerSolidMemoBadge).toBeInTheDocument();

    const headerSessionBadge = within(header!).queryByTestId('test-header-sessionBadge');
    expect(headerSessionBadge).toBeInTheDocument();

    const headerResourceLink = within(header!).queryByTestId('test-header-resourceLink');
    expect(headerResourceLink).toBeInTheDocument();
    expect(headerResourceLink).toHaveTextContent('Resource');
  });
});
