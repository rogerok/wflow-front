import { makeAutoObservable } from 'mobx';

import { IField } from './BaseField';
import { fieldFactory } from './FieldFactory';
import { FieldType } from './types';

export class ListField<T> implements IField<T[]> {
  fields: FieldType<T>[] = [];

  constructor(name: string, defaultValue: T[]) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.fields = defaultValue.map((item, index) =>
      fieldFactory.createField(`${name}[${index}]`, item)
    );

    this._name = name;
    this._value = defaultValue;
    this._defaultValue = this._value;
  }

  _defaultValue: T[];
  _disabled = false;
  _error: string | undefined;
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

  push(value: T): void {
    this.fields.push(
      fieldFactory.createField(`${this._name}[${this.fields.length}]`, value)
    );
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
