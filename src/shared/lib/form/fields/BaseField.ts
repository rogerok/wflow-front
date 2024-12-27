import { action, computed, makeObservable, observable } from 'mobx';

type BaseFieldConstructor = {
  placeholder?: string;
  label?: string;
  disabled?: boolean;
};

export type IField<T> = {
  _disabled: boolean;
  _error: string | undefined;
  _name: string;
  _touched: boolean;
  _value: T;
  _defaultValue: T;

  get disabled(): boolean;
  get touched(): boolean;
  get value(): T;
  reset(): void;
  setValue(value: T): void;
  touch(): void;
  unTouch(): void;
};

export abstract class BaseField<T> {
  _defaultValue: T;
  _value: T;
  _touched = false;
  _disabled = false;
  _label?: string;
  _placeholder?: string;
  _error: string | null = null;
  options: BaseFieldConstructor | undefined = undefined;
  _name: string;

  constructor(defaultValue: T, name: string, options?: BaseFieldConstructor) {
    this._defaultValue = defaultValue;
    this._value = defaultValue;
    this._name = name;

    if (options) {
      this._disabled = !!options.disabled;
      this._label = options.label;
      this._placeholder = options.placeholder;
    }

    makeObservable(this, {
      disabled: computed,
      error: computed,
      onChange: action,
      options: observable,
      reset: action,
      setDisabled: action,
      setError: action,
      setTouched: action,
      setValue: action,
      touched: computed,
      value: computed,
    });
  }

  setValue(value: T): void {
    this._value = value;
  }

  private setDefaultValue(defaultValue: T): void {
    this._defaultValue = defaultValue;
  }

  setTouched(touched: boolean): void {
    this._touched = touched;
  }

  setDisabled(disabled: boolean): void {
    this._disabled = disabled;
  }

  setError(error: string): void {
    this._error = error;
  }

  get value(): T {
    return this._value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  get touched(): boolean {
    return this._touched;
  }

  get error(): string | null {
    return this._error;
  }

  reset(): void {
    this.setTouched(false);
    this.setValue(this._defaultValue);
  }

  onChange(value: T): void {
    this.setValue(value);
    this.setTouched(true);
  }
}
