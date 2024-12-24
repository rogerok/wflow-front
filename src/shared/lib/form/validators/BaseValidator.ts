import { action, makeObservable, observable } from 'mobx';

import {
  ValidationResult,
  ValidationResultItemPath,
  ValidationResultMap,
} from './types';

export abstract class BaseValidator<Values, SchemaType> {
  schema: SchemaType;

  errors: ValidationResult<Values> = {
    errorMap: new Map() as ValidationResultMap<Values>,
    isSuccess: false,
  };

  constructor(private readonly validationSchema: SchemaType) {
    this.schema = validationSchema;

    makeObservable(this, {
      validate: action,
      errors: observable,
      setErrors: action,
    });
  }

  abstract validate(data: Values): void;

  setErrors(errors: ValidationResult<Values>): void {
    this.errors = errors;
  }

  setError(path: ValidationResultItemPath<Values>, error: string): void {
    this.errors.errorMap?.set(path, error);
  }
}
