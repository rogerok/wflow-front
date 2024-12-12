import { ZodSchema } from 'zod';

type ValidationResult =
  | { isSuccess: true; errorList: null }
  | { isSuccess: false; errorList: ValidatorErrorSchema[] };

type ValidatorErrorSchema = {
  path: string;
  error: string;
};

abstract class BaseValidator<Values, SchemaType> {
  protected constructor(private readonly validationSchema: SchemaType) {
    this.schema = validationSchema;
    this.isSuccess = false;
  }

  private schema: SchemaType;
  private isSuccess: boolean;
  private readonly err: ValidationResult = {
    errorList: [],
    isSuccess: false,
  };

  abstract validate(data: Values): ValidationResult;

  get success(): boolean {
    return this.isSuccess;
  }

  private setSuccess(value: boolean): void {
    this.isSuccess = value;
  }

  get errors(): ValidationResult {
    return this.err;
  }

  setErrors(errors: ValidationResult): void {
    this.err.errorList = errors.errorList;
    this.isSuccess = errors.isSuccess;
  }
}

class ZodValidator<Values> extends BaseValidator<Values, ZodSchema<Values>> {
  constructor(schema: ZodSchema<Values>) {
    super(schema);
  }

  validate(values: Values): ValidationResult {
    return {
      isSuccess: false,
      errorList: [],
    };
  }
}

// export class Validator<Values> implements IValidator<Values> {
//   private schema: ZodSchema;
//   private success = false;
//   private error: ValidatorErrorSchema[] | null = null;
//
//   constructor(options: ValidatorConstructor<Values>) {
//     this._schema = options.schema;
//   }
//
//   validate(data: Values) {
//     const parseResult = this._schema.safeParse(data);
//
//     if (parseResult.error) {
//       const err = parseResult.error.errors;
//       console.log(console.log(err));
//     }
//   }
// }
