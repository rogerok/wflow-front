import { makeAutoObservable } from 'mobx';

interface FieldWithValue<T> {
  value: T;
  reset: () => void;
}

interface TouchableField {
  isTouched: boolean;
  touch: (isTouched: boolean) => void;
}

interface FieldWithError {
  error?: string;
}

export class FormField<TField>
  implements FieldWithValue<TField>, TouchableField, FieldWithError
{
  readonly initialValue: TField;

  isTouched = false;
  isDisabled = false;
  value: TField;
  name: string;
  error: undefined | string = undefined;

  constructor(name: string, value: TField) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.initialValue = value;
    this.value = value;
    this.name = name;
  }

  private setValue(value: TField): void {
    this.value = value;
  }

  onChange(value: TField): void {
    this.touch(true);
    this.setValue(value);
  }

  touch(isTouched: boolean): void {
    this.isTouched = isTouched;
  }

  reset(): void {
    this.touch(false);
    this.setValue(this.initialValue);
  }
}
