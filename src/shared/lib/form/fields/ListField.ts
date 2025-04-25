import { makeAutoObservable } from 'mobx';

import { fieldFactory } from '../factory/FieldFactory';
import { BaseFieldType, FieldType } from './types';

export class ListField<T> implements BaseFieldType<T[]> {
  fields: FieldType<T>[] = [];

  constructor(name: string, defaultValue: T[]) {
    this._name = name;
    this._value = defaultValue;
    this._defaultValue = this._value;
    this.fields = defaultValue.map((item, index) => {
      return fieldFactory.createField(`${name}[${index}]`, item);
    });

    makeAutoObservable(this, {}, { autoBind: true });
  }

  _defaultValue: T[];
  _disabled = false;
  _error: string | undefined = undefined;
  _name: string;
  _touched = false;
  _value: T[];

  setValue(value: T[]): void {
    this._value = value;
  }

  get value(): T[] {
    return this._value;
  }

  get disabled(): boolean {
    return false;
  }

  get touched(): boolean {
    return this._touched;
  }

  get name(): string {
    return this._name;
  }

  push(value: T): void {
    this.fields.push(
      fieldFactory.createField(`${this._name}[${this.fields.length}]`, value),
    );
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

  setError(error: string | undefined): void {
    this._error = error;
  }
}
