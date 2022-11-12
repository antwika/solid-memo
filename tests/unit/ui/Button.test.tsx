import { fireEvent, render, screen } from '@testing-library/react';
import Button from '@/ui/Button';

describe('Button', () => {
  it('can be clicked to invoke the onClick callback', () => {
    const onClick = jest.fn();
    render(
      <Button
        dataTestid='test-button'
        onClick={onClick}
      ><span data-testid='test-children'>Text</span></Button>
    );
    const button = screen.queryByTestId('test-button');
    expect(button).toBeInTheDocument();
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(button!);
    expect(onClick).toHaveBeenCalled();
  });
});
