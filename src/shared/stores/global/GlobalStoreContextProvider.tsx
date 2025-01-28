import { useRouter } from '@tanstack/react-router';
import { createContext, ReactNode, useState } from 'react';

import { GlobalStore } from './GlobalStore';

export const GlobalStoreContext = createContext<GlobalStore | null>(null);

export const GlobalStoreContextProvider = (props: {
  children: ReactNode;
}): ReactNode => {
  const router = useRouter();

  const [store] = useState(() => new GlobalStore(router));

  return (
    <GlobalStoreContext value={store}>{props.children}</GlobalStoreContext>
  );
};
