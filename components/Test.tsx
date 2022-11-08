'use client';

import { sm2 } from '@/lib/sm2';

export default function Test() {
  return (
    <div role="status" className="flex flex-col items-center">
      Test
      <button onClick={() => { alert('Clicked'); }}>My button</button>
    </div>
  );
}
