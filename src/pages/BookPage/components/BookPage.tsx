import { cn } from '@bem-react/classname';
import { Typography, VStack } from '@shared/elements/ui';
import { GoalsService } from '@shared/services';
import { getRouteApi } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { BookService } from '../model/services/BookService';
import { GoalsList } from './GoalsList/GoalsList';

const cnBookPage = cn('BookPage');

interface BookPageProps {
  className?: string;
}

const route = getRouteApi('/_protected/books/$bookId');

export const BookPage: FC<BookPageProps> = observer((props) => {
  const [bookService] = useState(() => new BookService());
  const [goalsService] = useState(() => new GoalsService());

  const param = route.useParams();

  useEffect(() => {
    bookService.getById(param.bookId);
    goalsService.list({ bookId: param.bookId });

    return () => {
      bookService.abortRequest();
      goalsService.abortRequest();
    };
  }, [bookService, goalsService, param.bookId]);

  return (
    <div className={cnBookPage(undefined, [props.className])}>
      <VStack gap={'8'}>
        <Typography
          size={'xl'}
          align={'center'}
          as={'h2'}
          weight={'bold'}
          fullWidth
        >
          {bookService.data?.name}
        </Typography>
        <Typography size={'l'}>Описание:</Typography>
        <Typography size={'m'}>{bookService.data?.description}</Typography>
      </VStack>
      <GoalsList />
    </div>
  );
});
