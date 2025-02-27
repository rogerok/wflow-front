import { createContext } from 'react';

import { GoalsPageFacade } from '../services/GoalsPageFacade';

export const GoalsContext = createContext<GoalsPageFacade | null>(null);
