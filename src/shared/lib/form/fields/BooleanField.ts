import { makeAutoObservable } from 'mobx';

import { BaseFieldType } from './types';

export class BooleanField implements BaseFieldType<boolean> {
  constructor(value: boolean, name: string) {
    makeAutoObservable(this, {}, { autoBind: true });

    this._name = name;
    this._value = value;
    this._defaultValue = this._value;
  }

  _defaultValue: boolean;
  _disabled = false;
  _error: string | undefined;
  _name: string;
  _touched = false;
  _value: boolean;

  get disabled(): boolean {
    return false;
  }

  get name(): string {
    return this._name;
  }

  get touched(): boolean {
    return false;
  }

  get value(): boolean {
    return this._value;
  }

  setValue(value: boolean): void {
    this.touch();
    this._value = value;
  }

  toggle(): void {
    this._value = !this._value;
  }

  reset(): void {
    this.unTouch();
    this.setError(undefined);
    this._value = this._defaultValue;
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
