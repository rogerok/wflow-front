import { cn } from '@bem-react/classname';
import { Page, PageTitle } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { BooksCreateForm } from './BooksCreateForm/BooksCreateForm';

const cnBooksCreatePage = cn('BooksCreatePage');

interface BooksCreatePageProps {
  className?: string;
}

export const BooksCreatePage: FC<BooksCreatePageProps> = observer((props) => {
  return (
    <Page className={cnBooksCreatePage(undefined, [props.className])}>
      <PageTitle title={'Добавить книгу'} />
      <BooksCreateForm />
    </Page>
  );
});
