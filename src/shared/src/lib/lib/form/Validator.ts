import { ZodIssue, ZodSchema } from 'zod';

type ValidationResult<Values> =
  | { isSuccess: true; errorList: null }
  | { isSuccess: false; errorList: ValidationErrorsListModel<Values> };

type ValidatorErrorModel<Values> = {
  path: keyof Values;
  error: string;
};

type ValidationErrorsListModel<Values> = ValidatorErrorModel<Values>[];

type BaseValuesType<T> = T extends object ? T : never;

abstract class BaseValidator<Values, SchemaType> {
  schema: SchemaType;
  private isSuccess: boolean;
  private readonly err: ValidationResult<Values> = {
    errorList: [],
    isSuccess: false,
  };

  constructor(private readonly validationSchema: SchemaType) {
    this.schema = validationSchema;
    this.isSuccess = false;
  }

  abstract validate(data: Values): void;

  get success(): boolean {
    return this.isSuccess;
  }

  private setSuccess(value: boolean): void {
    this.isSuccess = value;
  }

  get errors(): ValidationResult<Values> {
    return this.err;
  }

  setErrors(errors: ValidationResult<Values>): void {
    this.err.errorList = errors.errorList;
    this.isSuccess = errors.isSuccess;
  }
}

class ZodValidator<Values> extends BaseValidator<Values, ZodSchema<Values>> {
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

class NoOpValidator<Values> extends BaseValidator<Values, null> {
  constructor() {
    super(null);
  }

  validate(): ValidationResult<Values> {
    return {
      isSuccess: true,
      errorList: null,
    };
  }
}

type SupportedValidators<Values> = ZodValidator<Values> | NoOpValidator<Values>;

export class Validator<Values> {
  validator: SupportedValidators<Values>;

  constructor(schema?: unknown) {
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
