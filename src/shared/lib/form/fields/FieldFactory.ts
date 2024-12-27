import { BooleanField } from './BooleanField';
import { ListField } from './ListField';
import { NestedField } from './NestedField';
import { TextField } from './TextField';
import { FieldType } from './types';

export interface IFieldFactory {
  createField<T>(name: string, value: T): FieldType<T>;
}

export class FieldFactory implements IFieldFactory {
  createField<T>(name: string, value: T): FieldType<T> {
    if (typeof value === 'string' || typeof value === 'number') {
      return new TextField(name, value) as unknown as FieldType<T>;
    }

    if (typeof value === 'boolean') {
      return new BooleanField(value, name) as unknown as FieldType<T>;
    }

    if (Array.isArray(value)) {
      return new ListField<T>(name, value) as unknown as FieldType<T>;
    }

    // FIXME: this is doesnt work
    // if (typeof value === 'object') {
    //   return new NestedField(name, value) as unknown as FieldType<T>;
    // }

    // FIXME: rewrite logic of returning default object from outside of factory
    if (typeof value === 'object') {
      return value as unknown as FieldType<T>;
    }

    throw new Error(`Unknown field type: ${name}`);
  }
}

export const fieldFactory = new FieldFactory();
