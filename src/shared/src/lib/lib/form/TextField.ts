import { makeAutoObservable } from 'mobx';

interface FieldWithValue<T> {
  value: T;
  reset: () => void;
}

interface TouchableField {
  isTouched: boolean;
  touch: () => void;
}

interface FieldWithError {
  error?: string;
}

export class TextField<T>
  implements FieldWithValue<T>, TouchableField, FieldWithError
{
  readonly initialValue: T;

  isTouched = false;
  isDisabled = false;
  value: T;
  error: undefined | string = undefined;

  constructor(value: T) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.initialValue = value;
    this.value = value;
  }

  onChange(value: T): void {
    this.value = value;
  }

  touch(): void {
    console.log('touch');
  }

  reset(): void {
    console.log('reset');
  }

  // get error(): string | undefined {
  //   return this.error;
  // }
}
