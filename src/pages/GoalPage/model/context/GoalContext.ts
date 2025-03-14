import { createContext } from 'react';

import { GoalService } from '../services/GoalService';

export const GoalContext = createContext<GoalService | null>(null);
