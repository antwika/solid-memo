'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '../lib/store';

type Props = {
  dataTestid?: string,
  children: React.ReactNode,
};

export default function ReduxProvider({ dataTestid, children }: Props) {
  return (
    <div data-testid={dataTestid} >
      <Provider store={store}>{children}</Provider>
    </div>
  );
}
