import { ValidationResult } from './types';
import { BaseValidator } from './BaseValidator';

export class NoOpValidator<Values> extends BaseValidator<Values, null> {
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
