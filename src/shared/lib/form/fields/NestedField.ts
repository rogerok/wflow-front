import { makeAutoObservable } from 'mobx';

import { fieldFactory } from '../factory/FieldFactory';
import { BaseFieldType, FieldType } from './types';

type NestedFieldType<T> = {
  [K in keyof T]: FieldType<T[K]>;
};

function createNestedFields<T>(
  parentName: string,
  value: T,
): NestedFieldType<T> {
  const fields: NestedFieldType<T> = {} as NestedFieldType<T>;

  for (const key in value) {
    console.log(key);
    fields[key] = fieldFactory.createField(`${parentName}${key}`, value[key]);
  }
  return fields;
}

export class NestedField<T> implements BaseFieldType<T> {
  _defaultValue: T;
  _disabled = false;
  _error: string | undefined;
  _name: string;
  _touched = false;
  _value: T;

  fields: NestedFieldType<T> = {} as NestedFieldType<T>;

  constructor(name: string, value: T) {
    this._name = name;
    this._value = value;
    this._defaultValue = value;
    this.fields = createNestedFields(value);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  get name(): string {
    return this._name;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  get touched(): boolean {
    return this._touched;
  }

  get value(): T {
    return this._value;
  }

  setError(error: string | undefined): void {
    this._error = error;
  }

  setValue(value: T): void {
    this._value = value;
  }

  reset(): void {
    this.unTouch();
    this.setValue(this._defaultValue);
    this.setError(undefined);
  }

  touch(): void {
    this._touched = true;
  }

  unTouch(): void {
    this._touched = false;
  }
}
