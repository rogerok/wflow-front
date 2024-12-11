import { makeAutoObservable } from 'mobx';
import { FormField } from './FormField';

interface FormConstructor<T> {
  fields: Record<keyof T, FormField<unknown>>;
  defaultValues: Record<keyof T, unknown>;
}

interface FormFieldOptionConfig<T> {
  value: T;
  name: string;
  placeholder?: string;
  errorMsg?: string;
  disabled?: boolean;
}

export class FormStore<TFormValues> implements FormConstructor<TFormValues> {
  fields: Record<keyof TFormValues, FormField<unknown>>;
  defaultValues: Record<keyof TFormValues, FormField<unknown>['value']>;
  formValues: Record<keyof TFormValues, FormField<unknown>['value']>;

  constructor(options: FormConstructor<TFormValues>) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.formValues = options.defaultValues;
    this.defaultValues = options.defaultValues;
    this.fields = options.fields;
  }
}
