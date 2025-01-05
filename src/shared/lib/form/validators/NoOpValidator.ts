import { BaseValidator } from './BaseValidator';

export class NoOpValidator<Values> extends BaseValidator<Values, null> {
  constructor() {
    super(null);
  }

  validate(): void {
    this.setErrors({
      isSuccess: true,
      errorMap: null,
    });
  }
}
