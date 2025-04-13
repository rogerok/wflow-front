import { useContext } from 'react';

import { RechartsContext } from '../../providers/rechartsProvider/RechartsProvider';
import { RechartsType } from '../../types/uiTypes/uiTypes';

export const useRechartsContext = (): RechartsType => {
  const context = useContext(RechartsContext);
  if (!context) {
    throw new Error(
      'useRechartsContext must be used within a RechartsProvider',
    );
  }
  return context;
};
