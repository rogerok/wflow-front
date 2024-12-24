import { computed, makeAutoObservable } from 'mobx';
import { ZodSchema } from 'zod';

import { NoOpValidator } from './validators/NoOpValidator';
import { SupportedValidators, ValidationResult } from './validators/types';
import { ZodValidator } from './validators/ZodValidator';

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
    // Make this a computed property that reflects handler's observable errors
    return this.handler.errors;
  }

  reset(): void {
    this.handler.setErrors({
      errorList: [],
      isSuccess: false,
    });
  }
}
