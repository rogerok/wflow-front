import { createContext, ReactNode } from 'react';

import { GlobalStore, globalStore } from './GlobalStore';

export const GlobalStoreContext = createContext<GlobalStore | null>(null);

export const GlobalStoreContextProvider = (props: {
  children: ReactNode;
}): ReactNode => {
  return (
    <GlobalStoreContext value={globalStore}>
      {props.children}
    </GlobalStoreContext>
  );
};
