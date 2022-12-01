import { render, screen, within } from '@testing-library/react';
import Spinner from '@/components/Spinner';

describe('Spinner', () => {
  it('renders', () => {
    render(
      <Spinner dataTestid='test-spinner' label='Loading...' />,
    );

    const spinner = screen.queryByTestId('test-spinner');
    expect(spinner).toBeInTheDocument();

    const spinnerSvg = within(spinner!).queryByTestId('test-spinner-svg');
    expect(spinnerSvg).toBeInTheDocument();

    const spinnerLabel = within(spinner!).queryByTestId('test-spinner-label');
    expect(spinnerLabel).toBeInTheDocument();
    expect(spinnerLabel).toHaveTextContent('Loading...');
  });
});
