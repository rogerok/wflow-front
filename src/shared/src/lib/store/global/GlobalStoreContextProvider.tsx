import { createContext, ReactNode, useContext } from 'react';
import { GlobalStore } from './GlobalStore';

const GlobalStoreContext = createContext<GlobalStore | null>(null);

export const GlobalStoreContextProvider = (props: { children: ReactNode }) => {
  return (
    <GlobalStoreContext.Provider value={new GlobalStore()}>
      {props.children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = (): GlobalStore => {
  const store = useContext(GlobalStoreContext);

  if (store === null) {
    throw new Error('GlobalStore store is not provided');
  }

  return store;
};
