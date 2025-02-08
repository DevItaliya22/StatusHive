import { useState } from 'react';

export function useLocation() {
  const [pathname, setPathname] = useState('/settings/general');

  return { 
    pathname,
    navigate: (path: string) => setPathname(path)
  };
}