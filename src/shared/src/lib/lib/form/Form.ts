import { makeAutoObservable } from 'mobx';
import { FormField } from './FormField';
import { ZodSchema } from 'zod';

interface FormStoreConstructor<T> {
  defaultValues: T;
  schema: ZodSchema;
}

type FieldsMapper<TFormValues> = {
  [Property in keyof TFormValues]: FormField<TFormValues[Property]>;
};

export class FormStore<TFormValues> {
  defaultValues: TFormValues;
  schema: ZodSchema<TFormValues>;

  fields: FieldsMapper<TFormValues> = {} as FieldsMapper<TFormValues>;

  constructor(options: FormStoreConstructor<TFormValues>) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.defaultValues = options.defaultValues;
    this.schema = options.schema;

    this.initFields();
  }

  initFields() {
    for (const field in this.defaultValues) {
      this.fields[field] = this.initField(field, this.defaultValues[field]);
    }
  }

  initField<Key extends keyof TFormValues>(
    path: Key,
    data: TFormValues[Key]
  ): FormField<TFormValues[Key]> {
    return new FormField<TFormValues[Key]>(String(path), data);
  }

  get values(): TFormValues {
    const values = {} as TFormValues;

    for (const field in this.fields) {
      values[field] = this.fields[field].value;
    }

    return values;
  }
}
