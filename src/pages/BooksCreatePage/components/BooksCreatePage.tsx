import { cn } from '@bem-react/classname';
import { Page } from '@shared/elements';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { BooksCreateForm } from '../components/BooksCreateForm/BooksCreateForm';

const cnBooksCreatePage = cn('BooksCreatePage');

interface BooksCreatePageProps {
  className?: string;
}

export const BooksCreatePage: FC<BooksCreatePageProps> = observer((props) => {
  return (
    <Page className={cnBooksCreatePage(undefined, [props.className])}>
      <BooksCreateForm />
    </Page>
  );
});
