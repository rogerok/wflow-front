import { cn } from '@bem-react/classname';
import { OrderByCreatedAtRequestType } from '@shared/api';
import { Menu } from '@shared/elements/ui';
import { FC } from 'react';

import { BooksSortOptions } from '../../model/constants/constants';
import { useBooksContext } from '../../model/hooks/useBooksContext';

const cnBooksSortMenu = cn('BooksSortMenu');

interface BooksSortMenuProps {
  className?: string;
}

export const BooksSortMenu: FC<BooksSortMenuProps> = (props) => {
  const service = useBooksContext();

  return (
    <Menu<OrderByCreatedAtRequestType>
      className={cnBooksSortMenu(undefined, [props.className])}
      options={BooksSortOptions}
      title={'Сортировать'}
      onChange={(value) => service.list({ orderBy: value })}
    />
  );
};
