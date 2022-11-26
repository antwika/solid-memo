import { render, screen, within } from '@testing-library/react';
import Page from '@/app/card/[iri]/page';

const Title = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/ui/Title', () => (props: any) => Title(props));

describe('Page', () => {
  it('renders', () => {
    render(
      <Page params={{ iri: 'http://example.com/card#123' }} />,
    );

    const page = screen.queryByTestId('test-page');
    expect(page).toBeInTheDocument();

    const pageTitle = within(page!).queryByTestId('test-page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(Title).toHaveBeenCalledWith(
      expect.objectContaining({
        dataTestid: 'test-page-title',
        text: 'Card',
      }),
    );
  });
});
