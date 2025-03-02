import { useContext } from 'react';

import { FormStore } from '../../lib/form';
import { FormContext } from '../../providers/formStoreProvider/FromStoreProvider';

export const useFormStore = <
  T extends Record<string | number, any>,
>(): FormStore<T> => {
  const store = useContext(FormContext);

  if (!store) {
    throw new Error('FormStore is not provided');
  }

  return store as FormStore<T>;
};
