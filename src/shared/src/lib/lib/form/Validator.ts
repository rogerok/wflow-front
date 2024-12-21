import { ZodSchema } from 'zod';
import { ZodValidator } from './validators/ZodValidator';
import { NoOpValidator } from './validators/NoOpValidator';
import { SupportedValidators } from './validators/types';
import { BaseValidator } from './validators/BaseValidator';

export class Validator<
  Values extends Record<string | number, unknown>
> extends BaseValidator<Values, unknown> {
  validator: SupportedValidators<Values>;

  constructor(schema?: unknown) {
    super(schema);

    if (schema instanceof ZodSchema) {
      this.validator = new ZodValidator<Values>(schema);
    } else {
      this.validator = new NoOpValidator<Values>();
    }
  }

  validate(values: Values): void {
    this.validator.validate(values);
  }
}
