import { createContext, ReactNode } from 'react';

import { FormStore } from '../../lib/form';

export const FormContext = createContext<FormStore<
  Record<string | number, any>
> | null>(null);

type FormStoreProviderProps<T extends Record<string | number, any>> = {
  children: ReactNode;
  form: FormStore<T>;
};

export const FormStoreProvider = <T extends Record<string | number, any>>(
  props: FormStoreProviderProps<T>,
): ReactNode => {
  const { children, form } = props;

  return <FormContext value={form}>{children}</FormContext>;
};
