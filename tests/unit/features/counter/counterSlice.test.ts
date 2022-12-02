import * as counter from '../../../../src/features/counter/counterSlice';

jest.mock('@reduxjs/toolkit', () => ({
  createSlice: jest.fn().mockReturnValue({
    actions: {
      increment: jest.fn(),
      decrement: jest.fn(),
      incrementByAmount: jest.fn(),
    },
    reducer: jest.fn(),
  }),
}));

describe('counterSlice', () => {
  it('tests', () => {
    counter.increment();
    counter.decrement();
    counter.incrementByAmount(10);
    expect(counter.default).toBeDefined();
  });
});
