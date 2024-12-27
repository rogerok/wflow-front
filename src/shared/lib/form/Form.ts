import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';
import { ZodSchema } from 'zod';

import { BooleanField } from './fields/BooleanField';
import { FieldFactory,fieldFactory } from './fields/FieldFactory';
import { ListField } from './fields/ListField';
import { TextField } from './fields/TextField';
import { FieldType } from './fields/types';
import { FormField } from './FormField';
import { Validator } from './Validator';
import { ValidationResult } from './validators/types';

type FormHandleSubmitType<TFormValues> = (values: TFormValues) => Promise<void>;

interface FormStoreConstructor<TFormValues> {
  defaultValues: TFormValues;
  schema: ZodSchema;
  handleSubmit?: FormHandleSubmitType<TFormValues>;
}

type FieldsMapper<TFormValues> = {
  [Property in keyof TFormValues]: FormField<TFormValues[Property]>;
};

function initializeFields<TFormValues>(defaultValues: TFormValues): {
  [K in keyof TFormValues]: FieldType<TFormValues[K]>;
} {
  const fields = {} as {
    [K in keyof TFormValues]: FieldType<TFormValues[K]>;
  };

  for (const key in defaultValues) {
    fields[key] = fieldFactory.createField(key, defaultValues[key]);
  }

  return fields;
}

export class FormStore<TFormValues extends Record<string | number, any>> {
  defaultValues: TFormValues;
  validator: Validator<TFormValues>;

  fields: { [K in keyof TFormValues]: FieldType<TFormValues[K]> };
  fieldFactory = new FieldFactory();

  isSubmitting = false;
  isSubmitted = false;
  submitError: unknown;

  constructor(options: FormStoreConstructor<TFormValues>) {
    this.defaultValues = options.defaultValues;
    this.validator = new Validator(options.schema);
    this.fields = initializeFields(options.defaultValues);

    makeAutoObservable(this, {}, { autoBind: true });

    makeLoggable(this);
  }

  private initializeFields(defaultValues: TFormValues): {
    [K in keyof TFormValues]: FieldType<TFormValues[K]>;
  } {
    const fields = {} as {
      [K in keyof TFormValues]: FieldType<TFormValues[K]>;
    };

    for (const key in defaultValues) {
      fields[key] = this.fieldFactory.createField(key, defaultValues[key]);
    }

    return fields;
  }

  initField<Key extends keyof TFormValues>(
    path: Key,
    data: TFormValues[Key]
  ): FormField<TFormValues[Key]> {
    return new FormField<TFormValues[Key]>(String(path), data);
  }

  get errors(): ValidationResult<TFormValues> {
    return this.validator.errors;
  }

  setIsSubmitting(isSubmitting: boolean): void {
    this.isSubmitting = isSubmitting;
  }

  setIsSubmitted(isSubmitted: boolean): void {
    this.isSubmitted = isSubmitted;
  }

  async submit(handleSubmit: FormHandleSubmitType<TFormValues>): Promise<void> {
    try {
      this.setIsSubmitting(true);

      // this.validate();

      if (this.errors.isSuccess) {
        // await handleSubmit(this.values);
      }
    } catch (err: unknown) {
      this.submitError = err;
    } finally {
      this.setIsSubmitting(false);
      this.setIsSubmitted(true);
    }
  }

  reset(): void {
    for (const field in this.fields) {
      this.fields[field].reset();
    }

    this.setIsSubmitting(false);
    this.setIsSubmitted(false);
    this.validator.reset();
  }

  getValues<K extends keyof TFormValues>(): TFormValues {
    const result: TFormValues = {} as TFormValues;

    for (const field in this.fields) {
      result[field as TFormValues[K]] = this.getValueFromField(
        this.fields[field]
      );
    }
    return result;
  }

  getValueFromField(field: unknown): unknown {
    if (field instanceof TextField || field instanceof BooleanField) {
      return field.value;
    }

    if (field instanceof ListField) {
      return field.value.map(this.getValueFromField);
    }

    if (Array.isArray(field)) {
      return field.map(this.getValueFromField);
    }

    if (typeof field === 'object' && field !== null) {
      return Object.fromEntries(
        Object.entries(field).map(([key, value]) => {
          if (
            value instanceof TextField ||
            value instanceof ListField ||
            value instanceof BooleanField
          ) {
            return [key, this.getValueFromField(value)];
          }
          return [key, value];
        })
      );
    }
  }

  // validate(): void {
  //   this.validator.validate(this.values);
  // }
}
