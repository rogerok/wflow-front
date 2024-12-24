import { Path } from '../types/utils';
import { NoOpValidator } from './NoOpValidator';
import { ZodValidator } from './ZodValidator';

export type ValidationResult<Values> =
  | { isSuccess: true; errorMap: null }
  | { isSuccess: false; errorMap: ValidationResultMap<Values> };

export type SupportedValidators<
  Values extends Record<string | number, unknown>
> = ZodValidator<Values> | NoOpValidator<Values>;

export type ValidationResultItemPath<Values> = Path<Values>;

export type ValidationResultMap<Values> = Map<
  ValidationResultItemPath<Values>,
  string
>;
