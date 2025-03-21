import { action, makeObservable, observable } from 'mobx';

import {
  ValidationResult,
  ValidationResultItemPath,
  ValidationResultMap,
} from './types';

export abstract class BaseValidator<Values, SchemaType> {
  schema: SchemaType;

  errors: ValidationResult<Values> = {
    errorMap: null,
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
    if (!this.errors.errorMap) {
      this.errors.errorMap = {} as ValidationResultMap<Values>;
    }

    this.errors.errorMap[path] = error;
  }
}
