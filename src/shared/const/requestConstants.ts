export const OrderByRequestConstant = {
  CreatedAtDesc: 'createdAt desc',
  CreatedAtAsc: 'createdAt asc',
} as const;

export const PerPageConstant = {
  Default: 10,
  Options: [10, 20, 50],
} as const;
