import { makeAutoObservable } from 'mobx';
import { Validator } from './Validator';
import { z, ZodSchema } from 'zod';

interface FieldWithValue<T> {
  value: T;
  reset: () => void;
}

interface TouchableField {
  isTouched: boolean;
  touch: () => void;
}

interface FieldWithError {
  error?: string;
}

interface FormFieldConstructor<T> {
  name: string;
  initialValue?: T;
  schema?: ZodSchema;
}

export class FormField<TField>
  implements FieldWithValue<TField>, TouchableField, FieldWithError
{
  readonly initialValue: TField;

  isTouched = false;
  isDisabled = false;
  value: TField;
  error: undefined | string = undefined;

  validator: Validator<TField> | undefined = undefined;

  constructor(name: string, value: TField) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.initialValue = value;
    this.value = value;
    // if (schema) {
    //   this.validator = new Validator<TField>(schema);
    // }
  }

  private setValue(value: TField): void {
    this.value = value;
  }

  private validateValue(value: TField): void {
    if (this.validator) {
      this.validator.validate(value);
    }
  }

  onChange(value: TField): void {
    this.isTouched = true;
    this.setValue(value);
    this.validateValue(value);
  }

  touch(): void {
    console.log('touch');
  }

  reset(): void {
    this.isTouched = false;
    this.setValue(this.initialValue);
    console.log('reset');
  }
}
