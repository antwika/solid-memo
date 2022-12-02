import { render, screen, within } from '@testing-library/react';
import Page from '@/app/page';

const Title = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/ui/Title', () => (props: any) => Title(props));

const SolidMemoBadge = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/components/badge/SolidMemoBadge', () => (props: any) => SolidMemoBadge(props));

const Counter = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/components/Counter', () => (props: any) => Counter(props));

const SignInOutButton = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/components/SignInOutButton', () => (props: any) => SignInOutButton(props));

describe('Page', () => {
  it('renders', () => {
    render(
      <Page />,
    );

    const page = screen.queryByTestId('test-page');
    expect(page).toBeInTheDocument();

    const pageTitle = within(page!).queryByTestId('test-page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(Title).toHaveBeenCalledWith(
      expect.objectContaining({
        dataTestid: 'test-page-title',
        text: 'My home',
      }),
    );

    const pageHeader = within(page!).queryByTestId('test-page-header');
    expect(pageHeader).toBeInTheDocument();

    const pageSolidMemoBadge = within(page!).queryByTestId('test-page-solidMemoBadge');
    expect(pageSolidMemoBadge).toBeInTheDocument();
    expect(SolidMemoBadge).toHaveBeenCalledWith(
      expect.objectContaining({
        dataTestid: 'test-page-solidMemoBadge',
      }),
    );

    const pageCounter = within(page!).queryByTestId('test-page-counter');
    expect(pageCounter).toBeInTheDocument();
    expect(Counter).toHaveBeenCalledWith(
      expect.objectContaining({
        dataTestid: 'test-page-counter',
      }),
    );

    const pageSignInOutButton = within(page!).queryByTestId('test-page-signInOutButton');
    expect(pageSignInOutButton).toBeInTheDocument();
    expect(SignInOutButton).toHaveBeenCalledWith(
      expect.objectContaining({
        dataTestid: 'test-page-signInOutButton',
      }),
    );
  });
});
