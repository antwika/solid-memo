'use client';

import Notice from "src/ui/Notice";

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  return (
    <div>
      <Notice type="error">{ error.message }</Notice>
    </div>
  );
}