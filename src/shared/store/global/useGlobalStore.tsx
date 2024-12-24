import { useContext } from 'react';

import { GlobalStore } from './GlobalStore';
import { GlobalStoreContext } from './GlobalStoreContextProvider';

export const useGlobalStore = (): GlobalStore => {
  const store = useContext(GlobalStoreContext);

  if (store === null) {
    throw new Error('GlobalStore store is not provided');
  }

  return store;
};
