import type React from 'react';

interface Props {
  className?: string;
}

const catArt = [
  {
    name: '',
    art: `   /\`)    |,\\__/|
  ( (    _|  o o|._
-----------)))---)))------`,
  },
  {
    name: 'resume',
    art: `             (\`\\
              ) )   |,\\__/|
-------------------------------`,
  },
  {
    name: 'tech-blog',
    art: `                      (\`\\
                       ) )   |,\\__/|
----------------------------------------`,
  },
  {
    name: 'projects',
    art: `                          |\\__/,|   (\`\\
                        _.|o o  |_   ) )
-----------------------(((---(((--------`,
  },
];

const ASCIIArt: React.FC<Props> = ({ className = '' }) => {
  return (
    <>
      <div
        className={`text-content-xs font-mono text-gray-600 dark:text-gray-400 select-none ${className}`}
      >
        <pre>{catArt[0].art}</pre>
      </div>{' '}
    </>
  );
};

export default ASCIIArt;
