import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnBooksCreateForm = cn('BooksCreateForm');

interface BooksCreateFormProps {
  className?: string;
}

export const BooksCreateForm: FC<BooksCreateFormProps> = (props) => {
  return (
    <div className={cnBooksCreateForm(undefined, [props.className])}>
      BooksCreateForm
    </div>
  );
};