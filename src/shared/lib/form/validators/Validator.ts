import { computed, makeAutoObservable } from 'mobx';
import { ZodSchema } from 'zod';

import { NoOpValidator } from './NoOpValidator';
import { SupportedValidators, ValidationResult } from './types';
import { ZodValidator } from './ZodValidator';

export class Validator<Values extends Record<string | number, unknown>> {
  handler: SupportedValidators<Values>;

  constructor(schema?: unknown) {
    makeAutoObservable(this, {
      errors: computed,
    });

    if (schema instanceof ZodSchema) {
      this.handler = new ZodValidator<Values>(schema);
    } else {
      this.handler = new NoOpValidator<Values>();
    }
  }

  validate(values: Values): void {
    this.handler.validate(values);
  }

  get errors(): ValidationResult<Values> {
    return this.handler.errors;
  }

  reset(): void {
    this.handler.setErrors({
      errorMap: null,
      isSuccess: false,
    });
  }
}
