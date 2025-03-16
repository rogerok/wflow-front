import './BooksList.scss';

import { cn } from '@bem-react/classname';
import { BooksListResponseType } from '@shared/api';
import { Card, ElementRepeater, Skeleton, VStack } from '@shared/elements/ui';
import { FC } from 'react';

import { BooksListItem } from '../BooksListItem/BooksListItem';

const cnBooksList = cn('BooksList');

interface BooksListProps {
  className?: string;
  isLoading?: boolean;
  data: BooksListResponseType;
}

export const BooksList: FC<BooksListProps> = (props) => {
  const { className, data, isLoading } = props;
  if (isLoading) {
    return (
      <ul className={cnBooksList(undefined, [className])}>
        <ElementRepeater count={6}>
          <VStack gap={'16'} mt={'auto'} fullHeight>
            <Card>
              <Skeleton height={2} />
              <VStack mt={'auto'} gap={'16'}>
                <Skeleton count={3} height={3} rounded={3} />
              </VStack>
            </Card>
          </VStack>
        </ElementRepeater>
      </ul>
    );
  }

  return (
    <ul className={cnBooksList(undefined, [className])}>
      {data.map((book) => (
        <BooksListItem book={book} key={book.id} />
      ))}
    </ul>
  );
};
