'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import Badge from '@/ui/Badge';
import Button from '@/ui/Button';
import { decrement, increment } from '../features/counter/counterSlice';

type Props = {
  dataTestid?: string,
};

export default function Counter({ dataTestid }: Props) {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div data-testid={dataTestid} className='flex flex-row align-items justify-center space-x-2'>
      <Button
        dataTestid={`${dataTestid}-decrementButton`}
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </Button>
      <Badge dataTestid={`${dataTestid}-badge`}>{count}</Badge>
      <Button
        dataTestid={`${dataTestid}-incrementButton`}
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </Button>
    </div>
  );
}
