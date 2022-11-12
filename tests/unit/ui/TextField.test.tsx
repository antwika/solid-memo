import { fireEvent, render, screen, within } from '@testing-library/react';
import TextField from '@/ui/TextField';

describe('TextField', () => {
  it('can be typed into', () => {
    render(
      <TextField
        dataTestid='test-textField'
      />
    );
    expect(screen.queryByTestId('test-textField')).toBeInTheDocument();
    const textbox = screen.getByRole<HTMLInputElement>('textbox');
    expect(textbox.value).toBe('');
    fireEvent.change(textbox, { target: { value: 'Foo' }});
    expect(textbox.value).toBe('Foo');
  });
});
