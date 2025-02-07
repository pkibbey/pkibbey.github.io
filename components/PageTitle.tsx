'use client';

import { usePathname } from 'next/navigation';

function getTitle(pathname: string) {
  switch (pathname) {
    case '/resume':
      return 'Resume';
    default:
      return 'Hi, Im Phineas';
  }
}

export default function PageTitle() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return <h1 className="heading-1 mb-8 mt-4 max-w-3xl">{title}</h1>;
}
