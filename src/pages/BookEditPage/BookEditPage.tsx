import { cn } from '@bem-react/classname';
import { Page } from '@shared/elements/ui';
import { FC } from 'react';

const cnBookEditPage = cn('BookEditPage');

interface BookEditPageProps {
  className?: string;
}

export const BookEditPage: FC<BookEditPageProps> = (props) => {
  return (
    <Page className={cnBookEditPage(undefined, [props.className])}>
      BookEditPage
    </Page>
  );
};
