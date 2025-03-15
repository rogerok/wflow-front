import { cn } from '@bem-react/classname';
import { UiTextConstant } from '@shared/const';
import { Page, PageSeo } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { BooksCreateForm } from './BooksCreateForm/BooksCreateForm';

const cnBooksCreatePage = cn('BooksCreatePage');

interface BooksCreatePageProps {
  className?: string;
}

const pageInfo = UiTextConstant.add('книгу');

export const BooksCreatePage: FC<BooksCreatePageProps> = observer((props) => {
  return (
    <Page className={cnBooksCreatePage(undefined, [props.className])}>
      <PageSeo title={pageInfo} type={pageInfo} description={pageInfo} />
      <BooksCreateForm />
    </Page>
  );
});
