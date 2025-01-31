import { createContext, ReactNode, useState } from 'react';

import { RouterType } from '../../types/router';
import { GlobalStore } from './GlobalStore';

export const GlobalStoreContext = createContext<GlobalStore | null>(null);

export const GlobalStoreContextProvider = (props: {
  children: ReactNode;
  router: RouterType;
}): ReactNode => {
  const [store] = useState(() => new GlobalStore(props.router));

  return (
    <GlobalStoreContext value={store}>{props.children}</GlobalStoreContext>
  );
};
