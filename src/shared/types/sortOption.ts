export type SortOptionType<T extends string | number> = {
  value: T;
  label: string;
};

export type SortOptionsTypes<T extends string | number> = SortOptionType<T>[];
