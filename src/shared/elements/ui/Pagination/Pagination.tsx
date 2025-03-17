import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ReactElement, RefObject } from 'react';

import { QueryFilterRequestStore } from '../../../stores';
import { Button } from '../Button/Button';
import { HStack } from '../HStack/HStack';
import { IconComponent } from '../IconComponent/IconComponent';

const cnPagination = cn('Pagination');

interface PaginationProps<T extends HTMLElement> {
  className?: string;
  ref?: RefObject<T | null>;
  service: QueryFilterRequestStore<any, any>;
}

export const Pagination = observer(
  <T extends HTMLElement>(props: PaginationProps<T>): ReactElement => {
    const { className, service, ref } = props;

    const { currentPage, nextPage, prevPage, total, perPage } = service;

    const isGoBackDisabled = currentPage === 1;
    const isGoForwardDisabled = total < perPage;

    const handleNextPage = async (): Promise<void> => {
      await nextPage();
      ref?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePrevPage = async (): Promise<void> => {
      await prevPage();
      ref?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <HStack
        className={cnPagination(undefined, [className])}
        flexJustify={'between'}
        gap={'32'}
        align={'center'}
        pb={'32'}
        mt={'auto'}
      >
        <Button
          disabled={isGoBackDisabled}
          onClick={handlePrevPage}
          addonLeft={<IconComponent name={'DoubleArrowLeft'} size={'sm'} />}
        >
          Назад
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={isGoForwardDisabled}
          addonRight={<IconComponent name={'DoubleArrowRight'} size={'sm'} />}
        >
          Вперёд
        </Button>
      </HStack>
    );
  },
);
