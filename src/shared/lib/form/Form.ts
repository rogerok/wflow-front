import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';
import { ZodSchema } from 'zod';

import { fieldFactory } from './factory/FieldFactory';
import { BooleanField } from './fields/BooleanField';
import { ListField } from './fields/ListField';
import { NestedField } from './fields/NestedField';
import { TextField } from './fields/TextField';
import { FieldType } from './fields/types';
import { ValidationResult, ValidationResultMap } from './validators/types';
import { Validator } from './validators/Validator';

type FormHandleSubmitType<TFormValues> = (values: TFormValues) => Promise<void>;

interface FormStoreConstructor<TFormValues> {
  defaultValues: TFormValues;
  schema: ZodSchema;
  // handleSubmit?: FormHandleSubmitType<TFormValues>;
}

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
  private readonly defaultValues: TFormValues;
  private validator: Validator<TFormValues>;

  fields: { [K in keyof TFormValues]: FieldType<TFormValues[K]> };

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

  get errors(): ValidationResult<TFormValues> {
    return this.validator.errors;
  }

  private setIsSubmitting(isSubmitting: boolean): void {
    this.isSubmitting = isSubmitting;
  }

  private setIsSubmitted(isSubmitted: boolean): void {
    this.isSubmitted = isSubmitted;
  }

  async submit(handleSubmit: FormHandleSubmitType<TFormValues>): Promise<void> {
    try {
      this.setIsSubmitting(true);

      this.validate();

      if (this.errors.isSuccess) {
        await handleSubmit(this.getValues());
        this.setIsSubmitted(true);
      }
    } catch (err: unknown) {
      this.submitError = err;
    } finally {
      this.setIsSubmitting(false);
    }
  }

  reset(values?: TFormValues): void {
    for (const field in this.fields) {
      this.fields[field].reset();
    }

    this.setIsSubmitting(false);
    this.setIsSubmitted(false);
    this.validator.reset();
    this.fields = initializeFields(values ? values : this.defaultValues);
  }

  getValues<K extends keyof TFormValues>(): TFormValues {
    const result: TFormValues = {} as TFormValues;

    for (const field in this.fields) {
      result[field as TFormValues[K]] = this.getValueFromField(
        this.fields[field],
      );
    }
    return result;
  }

  getValueFromField(field: unknown): unknown {
    if (field instanceof TextField || field instanceof BooleanField) {
      return field.value;
    }

    if (field instanceof ListField) {
      return field.fields.map((nestedField) =>
        this.getValueFromField(nestedField),
      );
    }

    if (Array.isArray(field)) {
      return field.map(this.getValueFromField);
    }

    if (field instanceof NestedField) {
      return Object.fromEntries(
        Object.entries(field.fields).map(([key, nestedField]) => [
          key,
          this.getValueFromField(nestedField),
        ]),
      );
    }

    if (typeof field === 'object' && field !== null) {
      return Object.fromEntries(
        Object.entries(field).map(([key, value]) => [
          key,
          this.getValueFromField(value),
        ]),
      );
    }
  }

  validate(): void {
    this.validator.validate(this.getValues());
    if (!this.validator.errors.isSuccess) {
      for (const key in this.validator.errors.errorMap) {
        if (this.fields[key]) {
          this.fields[key].setError(
            this.validator.errors.errorMap[
              key as keyof ValidationResultMap<TFormValues>
            ],
          );
        }
      }
    }
  }
}
