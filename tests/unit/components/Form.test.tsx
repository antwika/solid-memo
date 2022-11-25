import { fireEvent, render, screen, within } from '@testing-library/react';
import Form from "@/components/Form";

describe('Form', () => {
  it('renders', () => {
    render(
      <Form dataTestid='test-form' />
    );
    
    const form = screen.queryByTestId('test-form');
    expect(form).toBeInTheDocument();
    
    const formTextField = within(form!).queryByTestId('test-form-textField');
    expect(formTextField).toBeInTheDocument();
    
    const formButton = within(form!).queryByTestId('test-form-button');
    expect(formButton).toBeInTheDocument();
    
    fireEvent.click(formButton!);
  });
});
