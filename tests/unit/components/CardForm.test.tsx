import React from 'react';
import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import CardForm from '@/components/CardForm';

const Button = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/ui/Button', () => (props: any) => Button(props));

const TextField = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/ui/TextField', () => (props: any) => TextField(props));

describe('CardForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('renders', () => {
    const onSubmit = jest.fn();
    render(
      <CardForm
        dataTestid='test-cardEditor'
        fields={[
          {
            id: 'iri',
            label: 'Iri',
            value: 'http://example.com/card#123',
          },
          {
            id: 'repetition',
            label: 'Repetition',
            value: '1',
          },
          {
            id: 'ease',
            label: 'Ease',
            value: '2',
          },
          {
            id: 'interval',
            label: 'Interval',
            value: '3',
          },
          {
            id: 'front',
            label: 'Front',
            value: 'Initial front value',
          },
          {
            id: 'back',
            label: 'Back',
            value: 'Initial back value',
          },
        ]}
        onSubmit={onSubmit}
      />,
    );

    const cardEditor = screen.queryByTestId('test-cardEditor');
    expect(cardEditor).toBeInTheDocument();

    const cardForm = within(cardEditor!).queryByTestId('test-cardEditor-form');
    expect(cardForm).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();

    const cardFormIriInput = within(cardForm!).queryByTestId('test-cardEditor-iriInput');
    expect(cardFormIriInput).toBeInTheDocument();
    expect(cardFormIriInput).toHaveValue('http://example.com/card#123');
    fireEvent.change(cardFormIriInput!, { target: { value: 'http://example.com/card#456' } });
    expect(cardFormIriInput).toHaveValue('http://example.com/card#456');

    const cardFormRepetitionInput = within(cardForm!).queryByTestId('test-cardEditor-repetitionInput');
    expect(cardFormRepetitionInput).toBeInTheDocument();
    expect(cardFormRepetitionInput).toHaveValue('1');
    fireEvent.change(cardFormRepetitionInput!, { target: { value: '10' } });
    expect(cardFormRepetitionInput).toHaveValue('10');

    const cardFormEaseInput = within(cardForm!).queryByTestId('test-cardEditor-easeInput');
    expect(cardFormEaseInput).toBeInTheDocument();
    expect(cardFormEaseInput).toHaveValue('2');
    fireEvent.change(cardFormEaseInput!, { target: { value: '20' } });
    expect(cardFormEaseInput).toHaveValue('20');

    const cardFormIntervalInput = within(cardForm!).queryByTestId('test-cardEditor-intervalInput');
    expect(cardFormIntervalInput).toBeInTheDocument();
    expect(cardFormIntervalInput).toHaveValue('3');
    fireEvent.change(cardFormIntervalInput!, { target: { value: '30' } });
    expect(cardFormIntervalInput).toHaveValue('30');

    const cardFormFrontInput = within(cardForm!).queryByTestId('test-cardEditor-frontInput');
    expect(cardFormFrontInput).toBeInTheDocument();
    expect(cardFormFrontInput).toHaveValue('Initial front value');
    fireEvent.change(cardFormFrontInput!, { target: { value: 'Edited front value' } });
    expect(cardFormFrontInput).toHaveValue('Edited front value');

    const cardFormBackInput = within(cardForm!).queryByTestId('test-cardEditor-backInput');
    expect(cardFormBackInput).toBeInTheDocument();
    expect(cardFormBackInput).toHaveValue('Initial back value');
    fireEvent.change(cardFormBackInput!, { target: { value: 'Edited back value' } });
    expect(cardFormBackInput).toHaveValue('Edited back value');

    const cardFormSubmitButton = within(cardForm!).queryByTestId('test-cardEditor-submitButton');
    expect(cardFormSubmitButton).toBeInTheDocument();

    fireEvent.submit(cardForm!);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenLastCalledWith(expect.any(Object), {
      iri: 'http://example.com/card#456',
      repetition: '10',
      ease: '20',
      interval: '30',
      front: 'Edited front value',
      back: 'Edited back value',
    });
  });
});
