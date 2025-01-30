import { cn } from '@bem-react/classname';
import { Page } from '@shared';
import { FC } from 'react';

const cnBooksCreatePage = cn('BooksCreatePage');

interface BooksCreatePageProps {
  className?: string;
}

export const BooksCreatePage: FC<BooksCreatePageProps> = (props) => {
  return (
    <Page className={cnBooksCreatePage(undefined, [props.className])}>
      BooksCreatePage
    </Page>
  );
};
