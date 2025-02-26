import { createContext, ReactNode, useState } from 'react';

import { RouterType } from '../../types/router';
import { GlobalStore } from './GlobalStore';

export const GlobalStoreContext = createContext<GlobalStore | null>(null);

type GlobalStoreContextProviderProps = {
  children: ReactNode;
  router: RouterType;
};

export const GlobalStoreContextProvider = (
  props: GlobalStoreContextProviderProps,
): ReactNode => {
  const { children, router } = props;

  const [store] = useState(() => new GlobalStore(router));

  return <GlobalStoreContext value={store}>{children}</GlobalStoreContext>;
};
