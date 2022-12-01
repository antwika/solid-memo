import { render, screen, within } from '@testing-library/react';
import Page from '@/app/resource/page';

const Title = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/ui/Title', () => (props: any) => Title(props));

const Form = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/components/Form', () => (props: any) => Form(props));

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
