import { makeAutoObservable } from 'mobx';

import { BaseFieldType } from './types';

export class TextField<T> implements BaseFieldType<T> {
  _defaultValue: T;
  _disabled = false;
  _error: string | undefined;
  _name: string;
  _touched = false;
  _value: T;

  constructor(name: string, value: T) {
    this._name = name;
    this._value = value;
    this._defaultValue = this._value;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  get disabled(): boolean {
    return this._disabled;
  }

  get name(): string {
    return this._name;
  }

  get touched(): boolean {
    return this._touched;
  }

  get value(): T {
    return this._value;
  }

  get error(): string | undefined {
    return this._error;
  }

  setValue(value: T): void {
    this.touch();
    this._value = value;
  }

  setError(error: string | undefined): void {
    this._error = error;
  }

  toDefaultValue(): void {
    this.setValue(this._defaultValue);
  }

  reset(): void {
    this.unTouch();
    this.toDefaultValue();
    this.setError(undefined);
  }

  touch(): void {
    this._touched = true;
  }

  unTouch(): void {
    this._touched = false;
  }
}
