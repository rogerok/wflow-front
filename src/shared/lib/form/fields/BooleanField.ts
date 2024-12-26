import { action, makeObservable } from 'mobx';

import { BaseField } from './BaseField';

export class BooleanField extends BaseField<boolean> {
  constructor(value: boolean, name: string) {
    super(value, name);
    makeObservable(this, {
      toggle: action,
    });
  }

  toggle(): void {
    this._value = !this._value;
  }
}
