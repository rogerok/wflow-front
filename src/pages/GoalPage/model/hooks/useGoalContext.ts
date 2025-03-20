import { useContext } from 'react';

import { GoalContext } from '../context/GoalContext';
import { GoalService } from '../services/GoalService';

export const useGoalContext = (): GoalService => {
  const service = useContext(GoalContext);

  if (service === null) {
    throw new Error('Goal context  is not provided');
  }

  return service;
};
