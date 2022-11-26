'use client';

import Button from '@/ui/Button';
import React, { useState } from 'react';

type Values = Record<string, string>;

type InputField = {
  label: string,
  id: string,
  value: string,
};

type Props = {
  dataTestid?: string,
  onSubmit: (e: React.SyntheticEvent, values: Values) => void,
  fields: InputField[],
};

export default function CardForm({
  dataTestid,
  fields,
  onSubmit,
}: Props) {
  const initialValues = fields.reduce<Values>((acc, input) => {
    acc[input.id] = input.value;
    return acc;
  }, {});

  const [values, setValues] = useState(initialValues);

  const renderedFields = fields.map(({
    label,
    id,
  }) => (
    <div key={id}>
      <label htmlFor={id}>{label}</label>
      <input
        data-testid={`${dataTestid}-${id}Input`}
        id={id}
        type="text"
        onChange={(e) => { setValues({ ...values, [id]: e.target.value }); }}
        value={ values[id] }
      />
    </div>
  ));

  return (
    <div data-testid={dataTestid}>
      <form data-testid={`${dataTestid}-form`} onSubmit={(e) => onSubmit(e, values)}>
        {renderedFields}
        <Button
          dataTestid={`${dataTestid}-submitButton`}
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
