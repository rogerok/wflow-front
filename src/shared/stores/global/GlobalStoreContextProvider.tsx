import { createContext, ReactNode } from 'react';

import { GlobalStore } from './GlobalStore';

export const GlobalStoreContext = createContext<GlobalStore | null>(null);

export const GlobalStoreContextProvider = (props: {
  children: ReactNode;
}): ReactNode => {
  return (
    <GlobalStoreContext.Provider value={new GlobalStore()}>
      {props.children}
    </GlobalStoreContext.Provider>
  );
};
