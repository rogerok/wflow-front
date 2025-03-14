import { useContext } from 'react';

import { GoalContext } from '../context/GoalContext';
import { GoalService } from '../services/GoalService';

export const useGoalService = (): GoalService => {
  const service = useContext(GoalContext);

  if (service === null) {
    throw new Error('GoalService store is not provided');
  }

  return service;
};
