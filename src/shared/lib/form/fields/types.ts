import { BooleanField } from './BooleanField';
import { ListField } from './ListField';
import { NestedField } from './NestedField';
import { TextField } from './TextField';

export type FieldType<T> = T extends string | number
  ? TextField<T>
  : T extends boolean
    ? BooleanField
    : T extends any[]
      ? ListField<T[number]>
      : T extends Record<string | number | symbol, unknown>
        ? NestedField<T>
        : never;

export type BaseFieldType<T> = {
  _defaultValue: T;
  _disabled: boolean;
  _error: string | undefined;
  _name: string;
  _touched: boolean;
  _value: T;

  get disabled(): boolean;
  get touched(): boolean;
  get value(): T;

  get name(): string;

  setError(err: string): void;
  setValue(value: T): void;

  reset(): void;

  touch(): void;
  unTouch(): void;
};
