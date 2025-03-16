import { cloneElement, FC, isValidElement, ReactNode } from 'react';

interface ElementRepeaterProps {
  count: number;
  children: ReactNode;
}

export const ElementRepeater: FC<ElementRepeaterProps> = (props) => {
  const { count, children } = props;

  return (
    isValidElement(children) && (
      <>
        {Array.from({ length: count }, (_, index) =>
          cloneElement(children, {
            key: index,
          }),
        )}
      </>
    )
  );
};
