'use client';

import Notice from "@/ui/Notice";
import Title from "@/ui/Title";

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