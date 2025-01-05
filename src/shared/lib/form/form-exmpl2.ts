// Validator Utility
import { makeAutoObservable, runInAction } from 'mobx';
import { ZodSchema, ZodType } from 'zod';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class Validator<T> {
  private schema?: ZodSchema<T>;
  private asyncValidationFn?: (value: T) => Promise<string | null>;

  constructor(
    schema?: ZodSchema<T>,
    asyncValidationFn?: (value: T) => Promise<string | null>
  ) {
    this.schema = schema;
    this.asyncValidationFn = asyncValidationFn;
  }

  validate(value: T): ValidationResult {
    if (!this.schema) return { isValid: true, errors: [] };

    const result = this.schema.safeParse(value);
    return {
      isValid: result.success,
      errors: result.success ? [] : result.error.errors.map((e) => e.message),
    };
  }

  async validateAsync(value: T): Promise<string | null> {
    if (!this.asyncValidationFn) return null;
    return this.asyncValidationFn(value);
  }
}

// Base Field Class
export class FormField<T> {
  value: T;
  error: string | null = null;
  touched = false;
  disabled = false;
  loading = false;
  metadata: Record<string, any> = {};

  private _errors: string[] = [];
  validator: Validator<T>;

  constructor(initialValue: T, validator: Validator<T> = new Validator()) {
    this.value = initialValue;
    this.validator = validator;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setValue(newValue: T): void {
    this.value = newValue;
    this.validate();
  }

  get errors(): string[] {
    return this._errors;
  }

  validate(): ValidationResult {
    const result = this.validator.validate(this.value);
    runInAction(() => {
      this._errors = result.errors;
    });
    return result;
  }

  async validateAsync() {
    this.loading = true;
    try {
      const error = await this.validator.validateAsync(this.value);
      runInAction(() => {
        this.error = error;
      });
    } finally {
      this.loading = false;
    }
  }

  reset(): void {
    this.touched = false;
    this.error = null;
  }
}

// Field Array Class
export class FieldArray<T> {
  fields: FormField<T>[];

  constructor(initialValues: T[], schema: ZodType<T>) {
    this.fields = initialValues.map(
      (value) => new FormField(value, new Validator(schema))
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addField(value: T): void {
    this.fields.push(new FormField(value, this.fields[0]?.validator));
  }

  removeField(index: number): void {
    this.fields.splice(index, 1);
  }

  get values() {
    return this.fields.map((field) => field.value);
  }

  validateAll() {
    this.fields.forEach((field) => field.validate());
  }

  get isValid() {
    return this.fields.every((field) => field.errors.length === 0);
  }
}

// Middleware Pipeline
export type Middleware = (values: Record<string, any>) => Promise<void>;

export class MiddlewarePipeline {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  async execute(values: Record<string, any>) {
    for (const middleware of this.middlewares) {
      await middleware(values);
    }
  }
}

// Form Store
export class FormStore {
  fields: Record<string, FormField<any>>;
  fieldArrays: Record<string, FieldArray<any>>;
  steps: string[] = [];
  currentStep = 0;
  isSubmitting = false;
  middlewarePipeline: MiddlewarePipeline;

  constructor(
    fields: Record<string, FormField<any>>,
    fieldArrays: Record<string, FieldArray<any>> = {},
    steps: string[] = [],
    middlewares: Middleware[] = []
  ) {
    this.fields = fields;
    this.fieldArrays = fieldArrays;
    this.steps = steps;
    this.middlewarePipeline = new MiddlewarePipeline();
    middlewares.forEach((mw) => this.middlewarePipeline.use(mw));
    makeAutoObservable(this, {}, { autoBind: true });
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  get isStepValid() {
    const stepFields = Object.keys(this.fields).filter(
      (key) => this.fields[key].metadata.step === this.currentStep
    );
    return stepFields.every((key) => this.fields[key].errors.length === 0);
  }

  validateAll() {
    Object.values(this.fields).forEach((field) => field.validate());
    Object.values(this.fieldArrays).forEach((array) => array.validateAll());
  }

  async submit() {
    this.validateAll();
    if (!this.isStepValid) return;

    this.isSubmitting = true;
    try {
      await this.middlewarePipeline.execute(this.values);
      console.log('Form Submitted:', this.values);
    } catch (e) {
      console.error('Submission Error:', e);
    } finally {
      this.isSubmitting = false;
    }
  }

  get values() {
    return {
      ...Object.fromEntries(
        Object.entries(this.fields).map(([key, field]) => [key, field.value])
      ),
      ...Object.fromEntries(
        Object.entries(this.fieldArrays).map(([key, array]) => [
          key,
          array.values,
        ])
      ),
    };
  }
}
