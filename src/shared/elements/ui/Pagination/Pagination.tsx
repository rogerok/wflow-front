import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { Button } from '../Button/Button';
import { HStack } from '../HStack/HStack';
import { IconComponent } from '../IconComponent/IconComponent';

const cnPagination = cn('Pagination');

interface PaginationProps {
  className?: string;
  page: number;
  perPage: number;
  total: number;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
}

export const Pagination: FC<PaginationProps> = observer((props) => {
  const { page, nextPage, prevPage, total, perPage, className } = props;

  const isGoBackDisabled = page === 1;
  const isGoForwardDisabled = total < perPage;

  return (
    <HStack
      className={cnPagination(undefined, [className])}
      flexJustify={'between'}
      gap={'32'}
      align={'center'}
    >
      <Button
        disabled={isGoBackDisabled}
        onClick={prevPage}
        addonLeft={<IconComponent name={'DoubleArrowLeft'} size={'sm'} />}
      >
        Назад
      </Button>
      <Button
        onClick={nextPage}
        disabled={isGoForwardDisabled}
        addonRight={<IconComponent name={'DoubleArrowRight'} size={'sm'} />}
      >
        Вперёд
      </Button>
    </HStack>
  );
});
