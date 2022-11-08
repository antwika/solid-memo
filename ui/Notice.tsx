'use client';

import { AiOutlineInfoCircle } from 'react-icons/ai';

type Type = 'error' | 'warning' | 'info';

type Props = {
  type: Type,
  children: React.ReactNode,
}

export default function Notice({ children, type="info" }: Props) {

  const containerStyle: Record<Type, string> = {
    error: 'bg-red-200 border-2 border-red-500',
    warning: 'bg-yellow-200 border-2 border-yellow-500',
    info: 'bg-blue-200 border-2 border-blue-500',
  }

  const iconContainerStyle: Record<Type, string> = {
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  }

  return (
    <div className={ `flex ${containerStyle[type]} shadow-md` }>
      <div className='flex flex-grow'>
        <div className={`px-2 py-4 h-full ${iconContainerStyle[type]}`}>
          <AiOutlineInfoCircle className='h-full text-white text-3xl' />
        </div>
        <div className='p-2'>
          {children}
        </div>
      </div>
    </div>
  );
};
