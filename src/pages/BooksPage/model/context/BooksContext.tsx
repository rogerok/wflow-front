import { BooksService } from '@shared/services';
import { createContext } from 'react';

export const BooksContext = createContext<BooksService | null>(null);
