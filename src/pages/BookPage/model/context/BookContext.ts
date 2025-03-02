import { createContext } from 'react';

import { BookPageFacade } from '../services/BookPageFacade';

export const BookContext = createContext<BookPageFacade | null>(null);
