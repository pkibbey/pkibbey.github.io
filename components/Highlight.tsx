import type React from 'react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  type?: 'tech' | 'achievement';
  children?: ReactNode;
}

const Highlight: React.FC<Props> = ({ type = 'base', children }) => {
  return (
    <span
      className={twMerge(
        'text-grey-950 dark:text-grey-50 font-semibold',
        type === 'tech' && 'sm:text-cyan-700 sm:dark:text-cyan-400',
        type === 'achievement' &&
          'sm:text-emerald-700 sm:dark:text-emerald-400',
        'inline decoration-2 underline-offset-2 transition-all',
      )}
    >
      {children}
    </span>
  );
};

export default Highlight;
