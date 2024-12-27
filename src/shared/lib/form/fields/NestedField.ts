import { makeAutoObservable } from 'mobx';

import { IField } from './BaseField';
import { fieldFactory } from './FieldFactory';
import { FieldType } from './types';

type NestedFieldType<T> = {
  [K in keyof T]: FieldType<T[K]>;
};

function createNestedFields<T>(value: T): NestedFieldType<T> {
  const fields: NestedFieldType<T> = {} as NestedFieldType<T>;

  for (const key in value) {
    fields[key] = fieldFactory.createField(key, value[key]);
  }
  return fields;
}

export class NestedField<T> implements IField<T> {
  _disabled = false;
  _error: string | undefined;
  _name: string;
  _touched = false;
  _value: T;
  _defaultValue: T;

  nestedFields: NestedFieldType<T> = {} as NestedFieldType<T>;

  constructor(name: string, value: T) {
    this._name = name;
    this._value = value;
    this._defaultValue = this._value;

    this.nestedFields = createNestedFields(value);

    makeAutoObservable(this, {}, { autoBind: true });
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

  setValue(value: T): void {
    this._value = value;
  }

  reset(): void {
    this._value = this._defaultValue;
  }

  touch(): void {
    this._touched = true;
  }

  unTouch(): void {
    this._touched = false;
  }
}
