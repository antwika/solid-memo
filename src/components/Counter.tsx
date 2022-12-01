'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import Badge from '@/ui/Badge';
import Button from '@/ui/Button';
import { decrement, increment } from '../features/counter/counterSlice';

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className='flex flex-row align-items justify-center space-x-2'>
      <Button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </Button>
      <Badge>{count}</Badge>
      <Button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </Button>
    </div>
  );
}
