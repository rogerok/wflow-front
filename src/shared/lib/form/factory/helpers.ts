import { BooleanField } from '../fields/BooleanField';
import { ListField } from '../fields/ListField';
import { NestedField } from '../fields/NestedField';
import { TextField } from '../fields/TextField';
import { FieldType } from '../fields/types';

export function createField<T>(name: string, value: T): FieldType<T> {
  if (typeof value === 'string' || typeof value === 'number') {
    return new TextField(name, value) as unknown as FieldType<T>;
  }

  if (typeof value === 'boolean') {
    return new BooleanField(value, name) as unknown as FieldType<T>;
  }

  if (Array.isArray(value)) {
    return new ListField(name, value) as unknown as FieldType<T>;
  }

  if (typeof value === 'object') {
    return new NestedField(name, value) as unknown as FieldType<T>;
  }

  throw new Error(`Unknown field type: ${name}`);
}
