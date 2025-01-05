import { Path } from '../types/utils';
import { NoOpValidator } from './NoOpValidator';
import { ZodValidator } from './ZodValidator';

// export type ValidationResult<Values> =
//   | { isSuccess: true; errorMap: null }
//   | { isSuccess: false; errorMap: ValidationResultMap<Values> };

export type ValidationResult<Values> = {
  isSuccess: boolean;
  errorMap: ValidationResultMap<Values> | null;
};

export type SupportedValidators<
  Values extends Record<string | number, unknown>
> = ZodValidator<Values> | NoOpValidator<Values>;

export type ValidationResultItemPath<Values> = Path<Values>;

export type ValidationResultMap<Values> = Record<
  ValidationResultItemPath<Values>,
  string
>;
