// import { makeAutoObservable, runInAction } from "mobx";
// import { ZodSchema, ZodType, z } from "zod";
//
// // A helper interface for validation results
// interface ValidationResult {
//   isValid: boolean;
//   errors: string[];
// }
//
// // Base Field Class
// export class FormField<T> {
//   value: T;
//   error: string | null = null;
//   touched = false;
//   disabled = false;
//   loading = false;
//
//   metadata: Record<string, any> = {}; // Arbitrary metadata for extensibility
//   observers: ((value: T) => void)[] = []; // Observers for additional logic
//
//   private _errors: string[] = [];
//   private readonly schema?: ZodSchema<T>;
//   private readonly asyncValidationFn?: (value: T) => Promise<string | null>;
//
//   constructor(
//     initialValue: T,
//     schema?: ZodType<T>,
//     options?: {
//       asyncValidationFn?: (value: T) => Promise<string | null>;
//     }
//   ) {
//     this.value = initialValue;
//     this.schema = schema;
//     this.asyncValidationFn = options?.asyncValidationFn;
//
//     makeAutoObservable(this, {}, { autoBind: true });
//   }
//
//   setValue(newValue: T) {
//     this.value = newValue;
//     this.validate();
//     this.notifyObservers();
//   }
//
//   addObserver(observer: (value: T) => void) {
//     this.observers.push(observer);
//   }
//
//   notifyObservers() {
//     this.observers.forEach((observer) => observer(this.value));
//   }
//
//   get errors(): string[] {
//     return this._errors;
//   }
//
//   validate(): ValidationResult {
//     if (!this.schema) {
//       return { isValid: true, errors: [] };
//     }
//
//     const result = this.schema.safeParse(this.value);
//     runInAction(() => {
//       this._errors = result.success
//         ? []
//         : result.error.errors.map((e) => e.message);
//     });
//
//     return { isValid: this._errors.length === 0, errors: this._errors };
//   }
//
//   async validateAsync() {
//     if (!this.asyncValidationFn) return;
//     this.loading = true;
//     try {
//       const error = await this.asyncValidationFn(this.value);
//       this.error = error;
//     } catch {
//       this.error = "Async validation failed";
//     } finally {
//       this.loading = false;
//     }
//   }
//
//   reset() {
//     this.touched = false;
//     this.error = null;
//   }
// }
//
// // A class to manage arrays of fields
// export class FieldArray<T> {
//   fields: FormField<T>[];
//
//   constructor(initialValues: T[], schema: ZodType<T>) {
//     this.fields = initialValues.map((value) => new FormField(value, schema));
//     makeAutoObservable(this, {}, { autoBind: true });
//   }
//
//   addField(value: T) {
//     this.fields.push(new FormField(value, this.fields[0]?.schema));
//   }
//
//   removeField(index: number) {
//     this.fields.splice(index, 1);
//   }
//
//   get values() {
//     return this.fields.map((field) => field.value);
//   }
//
//   validateAll() {
//     this.fields.forEach((field) => field.validate());
//   }
//
//   get isValid() {
//     return this.fields.every((field) => field.error === null);
//   }
// }
//
// // Main Form Store
// export class FormStore {
//   fields: Record<string, FormField<any>>;
//   fieldArrays: Record<string, FieldArray<any>>;
//   currentStep = 0;
//   steps: string[] = [];
//   isSubmitting = false;
//
//   private readonly middleware?: (values: Record<string, any>) => Promise<void>[];
//
//   constructor(
//     fields: Record<string, FormField<any>>,
//     fieldArrays: Record<string, FieldArray<any>> = {},
//     steps: string[] = [],
//     middleware?: ((values: Record<string, any>) => Promise<void>)[]
//   ) {
//     this.fields = fields;
//     this.fieldArrays = fieldArrays;
//     this.steps = steps;
//     this.middleware = middleware || [];
//     makeAutoObservable(this, {}, { autoBind: true });
//   }
//
//   nextStep() {
//     if (this.currentStep < this.steps.length - 1) {
//       this.currentStep++;
//     }
//   }
//
//   prevStep() {
//     if (this.currentStep > 0) {
//       this.currentStep--;
//     }
//   }
//
//   get isStepValid() {
//     const stepFields = Object.keys(this.fields).filter(
//       (key) => this.fields[key].metadata.step === this.currentStep
//     );
//     return stepFields.every((key) => this.fields[key].error === null);
//   }
//
//   validateAll() {
//     Object.values(this.fields).forEach((field) => field.validate());
//     Object.values(this.fieldArrays).forEach((array) => array.validateAll());
//   }
//
//   async runMiddleware() {
//     for (const middlewareFn of this.middleware) {
//       await middlewareFn(this.values);
//     }
//   }
//
//   get values() {
//     return {
//       ...Object.fromEntries(
//         Object.entries(this.fields).map(([key, field]) => [key, field.value])
//       ),
//       ...Object.fromEntries(
//         Object.entries(this.fieldArrays).map(([key, array]) => [key, array.values])
//       ),
//     };
//   }
//
//   async submit() {
//     this.validateAll();
//     if (!this.isStepValid) return;
//
//     this.isSubmitting = true;
//     try {
//       await this.runMiddleware();
//       console.log("Form Submitted:", this.values);
//     } catch (e) {
//       console.error("Submission Error:", e);
//     } finally {
//       this.isSubmitting = false;
//     }
//   }
// }
//
// // Specialized Field Types
// export class TextField extends FormField<string> {
//   constructor(initialValue = "", schema?: ZodSchema<string>) {
//     super(initialValue, schema || z.string());
//   }
//
//   setTrimmedValue(value: string): void {
//     this.value = value.trim();
//   }
// }
//
// export class NumberField extends FormField<number> {
//   private min?: number;
//   private max?: number;
//
//   constructor(initialValue = 0, schema?: ZodSchema<number>) {
//     super(initialValue, schema || z.number());
//   }
//
//   setMin(min: number): void {
//     this.min = min;
//   }
//
//   setMax(max: number): void {
//     this.max = max;
//   }
//
//   validate(): ValidationResult {
//     const result = super.validate();
//
//     if (this.value < (this.min || Number.MIN_VALUE)) {
//       result.errors.push(`Value must be at least ${this.min}`);
//     }
//
//     if (this.value > (this.max || Number.MAX_VALUE)) {
//       result.errors.push(`Value must not exceed ${this.max}`);
//     }
//
//     return result;
//   }
// }
//
// export class CheckboxField extends FormField<boolean> {
//   constructor(initialValue = false) {
//     super(initialValue);
//   }
//
//   toggle(): void {
//     this.value = !this.value;
//   }
// }
//
// // The overarching Form manager class
// export class Form {
//   private fields: Record<string, FormField<any>> = {};
//   private context: Record<string, any> = {};
//
//   constructor(initialFields: Record<string, FormField<any>> = {}) {
//     this.fields = initialFields;
//     makeAutoObservable(this);
//   }
//
//   addField(name: string, field: FormField<any>): void {
//     runInAction(() => {
//       this.fields[name] = field;
//     });
//   }
//
//   removeField(name: string): void {
//     runInAction(() => {
//       delete this.fields[name];
//     });
//   }
//
//   batchUpdate(updates: Record<string, any>): void {
//     runInAction(() => {
//       Object.entries(updates).forEach(([key, value]) => {
//         if (this.fields[key]) {
//           this.fields[key].setValue(value);
//         }
//       });
//     });
//   }
//
//   validate(): ValidationResult {
//     const errors: Record<string, string[]> = {};
//
//     let isValid = true;
//     Object.entries(this.fields).forEach(([key, field]) => {
//       const result = field.validate();
//       if (!result.isValid) {
//         isValid = false;
//         errors[key] =
