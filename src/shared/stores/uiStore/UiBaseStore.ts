import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';
import { ZodSchema } from 'zod';

import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../lib/utils/localStorage';
import { IUiBaseStore } from './types';

export class UiBaseStore<T> implements IUiBaseStore<T> {
  private readonly _storageKey: null | string;
  private _state: T;
  private _validationSchema: ZodSchema;

  constructor(
    defaultState: T,
    validationSchema: ZodSchema,
    storageKey?: string,
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
      this.setState(storedState);

      this.saveStateToStorage();
    }
  }

  setState = (state: T): void => {
    this._state = state;
  };

  setStateAndSaveToStorage = (state: T): void => {
    this.setState(state);
    this.saveStateToStorage();
  };

  saveStateToStorage(): void {
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
