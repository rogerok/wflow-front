export type IsTuple<T extends ReadonlyArray<unknown>> =
  number extends T['length'] ? false : true;

export type TupleKeys<T extends ReadonlyArray<unknown>> = Exclude<
  keyof T,
  keyof unknown[]
>;

type PathImpl<K extends string | number, V, TraversedTypes> = V extends
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint
  | Date
  | FileList
  | File
  ? `${K}`
  : true extends AnyIsEqual<TraversedTypes, V>
  ? `${K}`
  : `${K}` | `${K}.${PathInternal<V, TraversedTypes | V>}`;

type AnyIsEqual<T1, T2> = T1 extends T2
  ? IsEqual<T1, T2> extends true
    ? true
    : never
  : never;

export type IsEqual<T1, T2> = T1 extends T2
  ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
    ? true
    : false
  : false;

export type ArrayKey = number;

export type Path<T> = T extends any ? PathInternal<T> : never;

type PathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes>;
      }[TupleKeys<T>]
    : PathImpl<ArrayKey, V, TraversedTypes>
  : {
      [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes>;
    }[keyof T];
