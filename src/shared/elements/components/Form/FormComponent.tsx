import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { FormEvent, ReactNode } from 'react';

import { FormStore } from '../../../lib/form';
import { FormStoreProvider } from '../../../providers';

const cnFormComponent = cn('FormComponent');

interface FormComponentProps<T extends Record<string | number, any>> {
  className?: string;
  children: ReactNode;
  form: FormStore<T>;
  onSubmit: () => Promise<void>;
}

export const FormComponent = observer(
  <T extends Record<string | number, any>>(
    props: FormComponentProps<T>,
  ): ReactNode => {
    const { className, children, form, onSubmit } = props;

    const handleSubmit = async (
      event: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
      event.preventDefault();

      await onSubmit();
    };

    return (
      <FormStoreProvider form={form}>
        <form
          onSubmit={handleSubmit}
          className={cnFormComponent(undefined, [className])}
        >
          {children}
        </form>
      </FormStoreProvider>
    );
  },
);
