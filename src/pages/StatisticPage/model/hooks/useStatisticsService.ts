import { useContext } from 'react';

import { StatisticContext } from '../context/StatisticContext';
import { StatisticService } from '../services/StatisticService';

export const useStatisticsService = (): StatisticService => {
  const service = useContext(StatisticContext);

  if (service === null) {
    throw new Error('StatisticService store is not provided');
  }

  return service;
};
