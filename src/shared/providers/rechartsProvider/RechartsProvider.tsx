import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { RechartsModules } from '../../types/uiTypes/uiTypes';

export const RechartsContext = createContext<RechartsModules>(null);

export const RechartsProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement | null => {
  const ref = useRef<RechartsModules>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    import('recharts')
      .then((module) => (ref.current = module))
      .then(() => setLoaded(true));
  }, []);

  return loaded ? (
    <RechartsContext value={ref.current}>{children}</RechartsContext>
  ) : null;
};
