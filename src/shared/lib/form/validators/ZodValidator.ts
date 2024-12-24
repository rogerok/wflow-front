import { ZodIssue, ZodSchema } from 'zod';

import { BaseValidator } from './BaseValidator';
import { ErrorPathType, ValidationErrorsListModel } from './types';

export class ZodValidator<
  Values extends Record<string | number, unknown>
> extends BaseValidator<Values, ZodSchema<Values>> {
  validate(values: Values): void {
    const result = this.schema.safeParse(values);

    if (!result.success) {
      const errors = result.error.errors;
      this.setErrors({
        isSuccess: result.success,
        errorList: this.prepareErrorsList(errors),
      });
    } else {
      this.setErrors({
        isSuccess: result.success,
        errorList: null,
      });
    }
  }

  private prepareErrorsList(
    errors: ZodIssue[]
  ): ValidationErrorsListModel<Values> {
    return errors.reduce<ValidationErrorsListModel<Values>>((acc, err) => {
      acc.push({
        path: err.path as ErrorPathType<Values>,
        error: err.message,
      });
      return acc;
    }, []);
  }
}
