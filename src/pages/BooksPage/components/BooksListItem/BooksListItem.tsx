import { cn } from '@bem-react/classname';
import { BookResponseType } from '@shared/api';
import { routes, UiTextConstant } from '@shared/const';
import {
  Button,
  ButtonLink,
  Card,
  CardHeader,
  IconComponent,
  VStack,
} from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { BooksCreateReportForm } from '../BooksCreateReportForm/BooksCreateReportForm';
import { BooksDeleteButton } from '../BooksDeleteButton/BooksDeleteButton';

const cnBooksListItem = cn('BooksListItem');

interface BooksListItemProps {
  className?: string;
  book: BookResponseType;
}

export const BooksListItem: FC<BooksListItemProps> = observer((props) => {
  const { className, book } = props;

  return (
    <Card className={cnBooksListItem(undefined, [className])} as={'li'}>
      <VStack gap={'16'} mt={'auto'} fullHeight>
        <CardHeader title={book.name} />
        <VStack mt={'auto'} gap={'16'}>
          <ButtonLink
            fullWidth
            to={routes.bookDetails()}
            params={{ bookId: book.id }}
            addonRight={<IconComponent name={'BookIcon'} size={'sm'} />}
          >
            К книге
          </ButtonLink>

          <BooksCreateReportForm bookId={book.id} bookName={book.name} />
          <Button fullWidth variant={'outlined'} disabled>
            {UiTextConstant.edit()}
          </Button>
          <BooksDeleteButton bookName={book.name} bookId={book.id} />
        </VStack>
      </VStack>
    </Card>
  );
});
