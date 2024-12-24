import { ZodSchema } from 'zod';
import { ZodValidator } from './validators/ZodValidator';
import { NoOpValidator } from './validators/NoOpValidator';
import { SupportedValidators } from './validators/types';
import { computed, makeAutoObservable } from 'mobx';

// export class Validator<Values extends Record<string | number, unknown>> {
//   handler: SupportedValidators<Values>;
//
//   constructor(schema?: unknown) {
//     makeAutoObservable(this);
//
//     if (schema instanceof ZodSchema) {
//       this.handler = new ZodValidator<Values>(schema);
//     } else {
//       this.handler = new NoOpValidator<Values>();
//     }
//   }
//
//   validate(values: Values): void {
//     this.handler.validate(values);
//   }
//
//   get errors(): ValidationResult<Values> {
//     return this.handler.errors;
//   }
//
//   reset(): void {
//     this.handler.setErrors({
//       errorList: [],
//       isSuccess: false,
//     });
//   }
// }

export class Validator<Values extends Record<string | number, unknown>> {
  handler: SupportedValidators<Values>;

  constructor(schema?: unknown) {
    makeAutoObservable(this, {
      errors: computed, // Mark errors as a computed property
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

  get errors() {
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
