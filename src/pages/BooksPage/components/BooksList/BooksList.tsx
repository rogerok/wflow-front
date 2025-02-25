import './BooksList.scss';

import { cn } from '@bem-react/classname';
import { BooksListResponseType } from '@shared/api';
import { FC } from 'react';

import { BooksListItem } from '../BooksListItem/BooksListItem';

const cnBooksList = cn('BooksList');

interface BooksListProps {
  className?: string;
  data: BooksListResponseType;
}

export const BooksList: FC<BooksListProps> = (props) => {
  const { className, data } = props;

  return (
    <ul className={cnBooksList(undefined, [className])}>
      {data.concat(data).map((book) => (
        <BooksListItem book={book} key={book.id} />
      ))}
    </ul>
  );
};
