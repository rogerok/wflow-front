import { FieldType } from '../fields/types';
import { createField } from './helpers';

export class FieldFactory {
  createField<T>(name: string, value: T): FieldType<T> {
    return createField(name, value); // Use the helper to create the field
  }
}

export const fieldFactory = new FieldFactory();
