import { BooleanField } from './BooleanField';
import { TextField } from './TextField';
import { FieldType } from './types';

export interface IFieldFactory {
  createField<T>(name: string, value: T): FieldType<T>;
}

export class FieldFactory implements IFieldFactory {
  createField<T>(name: string, data: T): FieldType<T> {
    if (typeof data === 'string') {
      return new TextField(data, name) as unknown as FieldType<T>;
    }

    if (typeof data === 'boolean') {
      return new BooleanField(data, name) as unknown as FieldType<T>;
    }

    throw new Error(`Unknown field type: ${name}`);
  }
}
