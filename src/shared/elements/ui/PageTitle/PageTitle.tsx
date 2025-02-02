import { FC, ReactNode } from 'react';

interface PageTitleProps {
  title?: ReactNode;
}

export const PageTitle: FC<PageTitleProps> = (props) => {
  return (
    <title>
      {`${props.title ? `${props.title} |` : ''} Word Flow - Дневник автора`}
    </title>
  );
};
