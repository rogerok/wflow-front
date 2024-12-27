import { makeAutoObservable } from 'mobx';

import { IField } from './BaseField';

export class TextField<T> implements IField<T> {
  _disabled = false;
  _error: string | undefined;
  _name: string;
  _touched = false;
  _value: T;
  _defaultValue: T;

  constructor(name: string, value: T) {
    this._name = name;
    this._value = value;
    this._defaultValue = this._value;

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
