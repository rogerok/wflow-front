import { ZodIssue, ZodSchema } from 'zod';
import { ValidationErrorsListModel } from './types';
import { BaseValidator } from './BaseValidator';

export class ZodValidator<
  Values extends Record<string | number, unknown>
> extends BaseValidator<Values, ZodSchema<Values>> {
  validate(values: Values) {
    const result = this.schema.safeParse(values);

    if (!result.success) {
      const errors = result.error.errors;
      this.setErrors({
        isSuccess: result.success,
        errorList: this.prepareErrorsList(errors, values),
      });
    }
  }

  private prepareErrorsList(
    errors: ZodIssue[],
    values: Values
  ): ValidationErrorsListModel<Values> {
    return errors.reduce<ValidationErrorsListModel<Values>>((acc, err) => {
      if (values && typeof values === 'object' && err.path[0] in values) {
        acc.push({
          path: String(err.path[0]) as keyof Values,
          error: err.message,
        });
      }
      return acc;
    }, []);
  }
}
