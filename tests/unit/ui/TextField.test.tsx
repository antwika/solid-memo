import { render, screen, within } from '@testing-library/react';
import TextField from '@/ui/TextField';

describe('TextField', () => {
  it('renders', () => {
    render(
      <TextField
        dataTestid='test-textField'
      />
    );
    expect(screen.queryByTestId('test-textField')).toBeInTheDocument();
  });
});
