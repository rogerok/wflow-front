import { useContext } from 'react';

import { RechartsContext } from '../../providers/rechartsProvider/RechartsProvider';
import { RechartsType } from '../../types/uiTypes/uiTypes';

export const useRecharts = (): RechartsType => {
  const context = useContext(RechartsContext);
  if (!context) {
    throw new Error('useRecharts must be used within a RechartsProvider');
  }
  return context;
};
