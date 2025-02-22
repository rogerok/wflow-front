import { useContext } from 'react';

import { GlobalStoreContext } from '../../providers';
import { GlobalStore } from '../../stores';

export const useGlobalStore = (): GlobalStore => {
  const store = useContext(GlobalStoreContext);

  if (store === null) {
    throw new Error('GlobalStore store is not provided');
  }

  return store;
};
