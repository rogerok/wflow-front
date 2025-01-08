import { ZodIssue, ZodSchema } from 'zod';

import { Path } from '../types/utils';
import { BaseValidator } from './BaseValidator';

export class ZodValidator<
  Values extends Record<string | number, unknown>
> extends BaseValidator<Values, ZodSchema<Values>> {
  validate(values: Values): void {
    const result = this.schema.safeParse(values);

    this.errors.isSuccess = result.success;

    if (!result.success) {
      this.prepareErrorsMap(result.error.errors);
    } else {
      this.errors.errorMap = null;
    }
  }

  private prepareErrorsMap(errors: ZodIssue[]): void {
    errors.forEach((error) => {
      this.setError(error.path.join('.') as Path<Values>, error.message);
    });
  }
}
