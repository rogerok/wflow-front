import { createContext, ReactNode, useState } from 'react';

import { GlobalStore } from '../../stores/global/GlobalStore';
import { RouterType } from '../../types/router';

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
