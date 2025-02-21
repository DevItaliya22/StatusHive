import { useState } from 'react';

export function useLocation() {
  const [pathname, setPathname] = useState('/');

  return { 
    pathname,
    navigate: (path: string) => setPathname(path)
  };
}