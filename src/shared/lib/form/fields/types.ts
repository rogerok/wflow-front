import { BooleanField } from './BooleanField';
import { ListField } from './ListField';
import { NestedField } from './NestedField';
import { TextField } from './TextField';

//FIXME: неправильно подтягиваются типы, скорее всего надо рекурсивно инициализировать тип

export type FieldType<T> = T extends string
  ? TextField<T>
  : T extends boolean
  ? BooleanField
  : T extends any[]
  ? ListField<T>
  : T extends Record<string | number | symbol, unknown>
  ? NestedField<T>
  : never;
