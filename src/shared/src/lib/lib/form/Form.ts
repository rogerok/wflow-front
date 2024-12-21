import { makeAutoObservable } from 'mobx';
import { FormField } from './FormField';
import { ZodSchema } from 'zod';
import { Validator } from './Validator';

interface FormStoreConstructor<T> {
  defaultValues: T;
  schema: ZodSchema;
}

type FieldsMapper<TFormValues> = {
  [Property in keyof TFormValues]: FormField<TFormValues[Property]>;
};

export class FormStore<TFormValues extends Record<string | number, unknown>> {
  defaultValues: TFormValues;
  validator: Validator<TFormValues>;

  fields: FieldsMapper<TFormValues> = {} as FieldsMapper<TFormValues>;

  constructor(options: FormStoreConstructor<TFormValues>) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.defaultValues = options.defaultValues;
    this.validator = new Validator(options.schema);

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

  validate(): void {
    this.validator.validate(this.values);
  }

  get errorList() {
    return this.validator.errors.errorList;
  }
}
