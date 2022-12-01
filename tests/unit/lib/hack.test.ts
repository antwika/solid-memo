import { asyncComponent } from 'src/lib/hack';

describe('asyncComponent', () => {
  it('tests', () => {
    const mockAsyncComponent = jest.fn();
    const hackWrapper = asyncComponent(mockAsyncComponent);
    hackWrapper('foo');
    expect(mockAsyncComponent).toHaveBeenCalledTimes(1);
    expect(mockAsyncComponent).toHaveBeenCalledWith('foo');
  });
});
