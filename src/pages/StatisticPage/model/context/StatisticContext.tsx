import { createContext } from 'react';

import { StatisticService } from '../services/StatisticService';

export const StatisticContext = createContext<StatisticService | null>(null);
