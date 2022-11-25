'use client';

import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export type NoticeType = 'error' | 'warning' | 'info';

type Props = {
  dataTestid?: string,
  type: NoticeType,
  children: React.ReactNode,
}

export default function Notice({ dataTestid, children, type }: Props) {
  const containerStyle: Record<NoticeType, string> = {
    error: 'bg-red-200 border-2 border-red-500',
    warning: 'bg-yellow-200 border-2 border-yellow-500',
    info: 'bg-blue-200 border-2 border-blue-500',
  };

  const iconContainerStyle: Record<NoticeType, string> = {
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div data-testid={dataTestid} className={ `flex ${containerStyle[type]} shadow-md` }>
      <div className='flex flex-grow'>
        <div data-testid={`${dataTestid}-icon-container`}className={`px-2 py-4 h-full ${iconContainerStyle[type]}`}>
          <AiOutlineInfoCircle className='h-full text-white text-3xl' />
        </div>
        <div className='p-2'>
          {children}
        </div>
      </div>
    </div>
  );
}
