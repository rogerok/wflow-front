import { makeAutoObservable } from 'mobx';

import { IField } from './BaseField';

export class BooleanField implements IField<boolean> {
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

  get value(): boolean {
    return this._value;
  }

  get disabled(): boolean {
    return false;
  }

  get touched(): boolean {
    return false;
  }

  setValue(value: boolean): void {
    this._value = value;
  }

  toggle(): void {
    this._value = !this._value;
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
