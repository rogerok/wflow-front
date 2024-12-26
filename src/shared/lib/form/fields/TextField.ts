import { IField } from './BaseField';

export class TextField<T> implements IField<T> {
  disabled = false;
  error: string | undefined;
  initialValue: T;
  name: string;
  touched = false;
  value: T;

  constructor(name: string, value: T) {
    this.name = name;
    this.value = value;
    this.initialValue = this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }

  isDisabled(): boolean {
    return this.disabled;
  }

  isTouched(): boolean {
    return false;
  }

  reset(): void {
    this.value = this.initialValue;
  }

  touch(): void {
    this.touched = true;
  }

  unTouch(): void {
    this.touched = false;
  }
}
