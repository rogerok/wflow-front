import { BooksService } from '@shared/services';
import { useContext } from 'react';

import { BooksContext } from '../context/BooksContext';

export const useBooksContext = (): BooksService => {
  const service = useContext(BooksContext);

  if (service === null) {
    throw new Error('Books context is not provided');
  }

  return service;
};
