// import { ZodTypeAny } from 'zod';
//
// import { BaseField, IField } from './BaseField';
// import { FieldType } from './types';
//
// export class ListField<T> extends IField<T> {
//   fields: { [K in keyof T]: FieldType<T[K]> };
//
//   constructor(name: string, defaultValue: T[]) {
//     super(defaultValue, name); // Correctly passes T[] to BaseField
//   }
// }
