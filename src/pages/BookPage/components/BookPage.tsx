import './BookPage.scss';

import { cn } from '@bem-react/classname';
import { GoalResponseType } from '@shared/api';
import {
  Card,
  ElementRepeater,
  HStack,
  IconComponent,
  NotFoundLabel,
  Page,
  PageSeo,
  Pagination,
  Skeleton,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { getRouteApi } from '@tanstack/react-router';
import { GoalsList } from '@widgets/GoalsList';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';

import { BookContext } from '../model/context/BookContext';
import { BookPageFacade } from '../model/services/BookPageFacade';
import { BookGoalCardActions } from './BookGoalCardActions/BookGoalCardActions';

const cnBookPage = cn('BookPage');

interface BookPageProps {
  className?: string;
}

const route = getRouteApi('/_protected/books/$bookId');

const GoalsListSkeleton: FC = () => {
  return (
    <div className={cnBookPage('GoalsList')}>
      <ElementRepeater count={6}>
        <Card>
          <VStack fullHeight>
            <VStack gap={'16'}>
              <Skeleton count={3} />
            </VStack>
            <HStack flexJustify={'between'} gap={'32'} py={'16'}>
              <Skeleton count={3} />
            </HStack>
          </VStack>
        </Card>
      </ElementRepeater>
    </div>
  );
};

export const BookPage: FC<BookPageProps> = observer((props) => {
  const [bookFacade] = useState(() => new BookPageFacade());
  const ref = useRef<HTMLDivElement | null>(null);

  const param = route.useParams();

  const isLoading = bookFacade.isLoading;

  useEffect(() => {
    bookFacade.fetchBookData(param.bookId);

    return () => {
      bookFacade.abortRequests();
    };
  }, [bookFacade, param.bookId]);

  return (
    <Page className={cnBookPage(undefined, [props.className])}>
      <PageSeo
        title={`Книга ${bookFacade.bookData?.name ?? ''}`}
        type={'Книга'}
        description={bookFacade.bookData?.description}
      />
      <VStack gap={'8'} align={'center'} ref={ref}>
        <IconComponent name={'BookIconFilled'} size={'md'} />
        <Typography
          size={'xl'}
          align={'center'}
          as={'h2'}
          weight={'bold'}
          fullWidth
        >
          {bookFacade.bookData?.name}
        </Typography>

        <Typography>{bookFacade.bookData?.description}</Typography>
      </VStack>
      <VStack gap={'16'} pt={'16'} as={'section'}>
        <HStack flexJustify={'center'} align={'center'} gap={'16'} as={'p'}>
          <Typography
            size={'xl'}
            variant={'accent'}
            weight={'semibold'}
            align={'center'}
          >
            Мои цели
          </Typography>
          <IconComponent name={'GoalIcon'} size={'md'} />
        </HStack>
        {isLoading ? (
          <GoalsListSkeleton />
        ) : bookFacade.goalsData.length ? (
          <BookContext value={bookFacade}>
            <GoalsList
              className={cnBookPage('GoalsList')}
              data={bookFacade.goalsData}
              actions={(goal: GoalResponseType) => (
                <BookGoalCardActions goal={goal} />
              )}
            />
          </BookContext>
        ) : (
          <NotFoundLabel />
        )}

        <Pagination service={bookFacade.goalsRequest} ref={ref} />
      </VStack>
    </Page>
  );
});
