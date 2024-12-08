import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';
import { ZodSchema } from 'zod';

import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../lib/localStorage/utils';

export class UiBaseStore<T> implements IUiBaseStore<T> {
  readonly _storageKey: null | string;
  private _state: T;
  private _validationSchema: ZodSchema;

  constructor(
    defaultState: T,
    validationSchema: ZodSchema,
    storageKey?: string
  ) {
    makeAutoObservable(this, {}, { autoBind: true });

    makeLoggable(this);

    this._state = defaultState;
    this._validationSchema = validationSchema;
    this._storageKey = storageKey ?? null;
  }

  init(): void {
    const storedState = this.getStateFromStorage();

    if (this.validateState(storedState)) {
      this._state = storedState;
    } else {
      this.setState(this._state);
    }
  }

  setState = (state: T): void => {
    this._state = state;
    this.saveToStorage();
  };

  saveToStorage(): void {
    if (this._storageKey) {
      setLocalStorageItem<T>(this._storageKey, this._state);
    }
  }

  getStateFromStorage(): unknown | null {
    if (this._storageKey) {
      return getLocalStorageItem(this._storageKey);
    }
    return null;
  }

  validateState = (state: unknown): state is T => {
    return this._validationSchema.safeParse(state).success;
  };

  get currentState(): T {
    return this._state;
  }
}
