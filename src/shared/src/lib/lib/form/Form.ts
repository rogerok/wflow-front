import { makeAutoObservable } from 'mobx';
import { FormField } from './FormField';
import { ZodSchema } from 'zod';

// interface FormConstructor<T> {
//   fields: Record<keyof T, FormField<unknown>>;
//   defaultValues: Record<keyof T, unknown>;
// }

interface FormFieldOptionConfig<T> {
  value: T;
  name: string;
  placeholder?: string;
  errorMsg?: string;
  disabled?: boolean;
}

interface FormStoreConstructor<T> {
  defaultValues: T;
  schema: ZodSchema;
}

type MapByFields<TFormValues> = {
  [Property in keyof TFormValues]: FormField<TFormValues[Property]>;
};

export class FormStore<TFormValues> {
  defaultValues: TFormValues;
  schema: ZodSchema;

  fields: MapByFields<TFormValues> = {} as MapByFields<TFormValues>;

  constructor(options: FormStoreConstructor<TFormValues>) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.defaultValues = options.defaultValues;
    this.schema = options.schema;

    this.initFields();
  }

  initFields() {
    console.log('init');

    for (const field in this.defaultValues) {
      Object.defineProperty(
        this.fields,
        field,
        this.initField(field, this.defaultValues[field])
      );
    }
  }

  initField<Key extends keyof TFormValues>(
    path: Key,
    data: TFormValues[Key]
  ): FormField<TFormValues[Key]> {
    console.log();

    return new FormField<TFormValues[Key]>(String(path), data);
  }
}
