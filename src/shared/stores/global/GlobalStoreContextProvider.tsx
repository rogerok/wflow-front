import { useRouter } from '@tanstack/react-router';
import { createContext, ReactNode } from 'react';

import { GlobalStore } from './GlobalStore';

export const GlobalStoreContext = createContext<GlobalStore | null>(null);

export const GlobalStoreContextProvider = (props: {
  children: ReactNode;
}): ReactNode => {
  const router = useRouter();
  
  return (
    <GlobalStoreContext value={new GlobalStore(router)}>
      {props.children}
    </GlobalStoreContext>
  );
};
