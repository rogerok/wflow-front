import { useContext } from 'react';

import { GoalsContext } from '../context/GoalsContext';
import { GoalsPageFacade } from '../services/GoalsPageFacade';

export const useGoalsContext = (): GoalsPageFacade => {
  const service = useContext(GoalsContext);

  if (service === null) {
    throw new Error('Goal context  is not provided');
  }

  return service;
};
