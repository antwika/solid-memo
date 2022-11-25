'use client';

import React from 'react';

type Props = React.TableHTMLAttributes<HTMLTableElement> & {
  dataTestid?: string,
  children: React.ReactNode;
};

export default function Table(props: Props) {
  const { dataTestid, children, ...tableProps } = props;
  return (
    <table data-testid={dataTestid} {...tableProps} className="table-auto shadow-lg bg-white rounded-lg overflow-hidden">{ children }</table>
  );
}
