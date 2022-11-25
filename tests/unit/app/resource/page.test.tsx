import { render, screen, within } from '@testing-library/react';
import Page from "@/app/resource/page";

var Title = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/ui/Title', () => (props: any) => Title(props));

var Form = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/app/resource/form', () => (props: any) => Form(props));

describe('Page', () => {
  it('renders', () => {
    render(
      <Page dataTestid='test-page' />
    );
    
    const page = screen.queryByTestId('test-page');
    expect(page).toBeInTheDocument();

    const pageTitle = within(page!).queryByTestId('test-page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(Title).toHaveBeenCalledWith(
      expect.objectContaining({
        dataTestid: 'test-page-title',
        text: 'My resources',
      }),
    );
    
    const pageForm = within(page!).queryByTestId('test-page-form');
    expect(pageForm).toBeInTheDocument();
    expect(Form).toHaveBeenCalledWith(
      expect.objectContaining({
        dataTestid: 'test-page-form',
      }),
    );
  });
});
