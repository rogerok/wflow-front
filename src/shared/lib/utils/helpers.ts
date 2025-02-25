export const getLabel = (label: unknown): string | number | undefined => {
  if (typeof label === 'string' || typeof label === 'number') {
    return label;
  }
};
