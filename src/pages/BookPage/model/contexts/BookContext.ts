import { createContext } from 'react';

import { BookService } from '../services/BookService';

export const BookContext = createContext<BookService | null>(null);
