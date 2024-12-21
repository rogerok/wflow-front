import { ValidationResult } from './types';
import { action, makeObservable, observable, toJS } from 'mobx';

export abstract class BaseValidator<Values, SchemaType> {
  schema: SchemaType;

  errors: ValidationResult<Values> = {
    errorList: [],
    isSuccess: false,
  };

  protected constructor(private readonly validationSchema: SchemaType) {
    this.schema = validationSchema;

    makeObservable(this, {
      validate: action,
      errors: observable,
    });
  }

  abstract validate(data: Values): void;

  setErrors(errors: ValidationResult<Values>): void {
    this.errors = errors;
    console.log(toJS(this.errors));
  }
}
