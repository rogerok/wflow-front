import { BaseField } from './BaseField';
import { BooleanField } from './BooleanField';
import { TextField } from './TextField';

export type FieldsMapper<TFormValues> = {
  [Property in keyof TFormValues]: BaseField<TFormValues[Property]>;
};

export type FieldTypeText = 'text';
export type FieldTypeBoolean = 'boolean';
export type FieldTypeList = 'list';
export type FieldTypeFlatList = 'flatList';

// export type FieldType =
//   | FieldTypeText
//   | FieldTypeBoolean
//   | FieldTypeList
//   | FieldTypeFlatList;

// export type FieldPrimitiveConfig<T> = {
//   value: T;
//   type: FieldType;
// };
// export type ObjectConfig<T> = {
//   [K in keyof T]: FieldPrimitiveConfig<T[K]>;
// };
// export type ArrayFieldConfig<T> = {
//   value: T[];
//   type: FieldTypeFlatList;
//   fields: ObjectConfig<T>;
// };
// export type ArrayFlatListConfig<T> = {
//   value: T[];
//   type: 'flat-list';
// };

export type FieldType<T> = T extends string
  ? TextField<T>
  : T extends boolean
  ? BooleanField
  : never;
