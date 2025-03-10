import { cn } from '@bem-react/classname';
import { BookResponseType } from '@shared/api';
import { routes, UiTextConstant } from '@shared/const';
import {
  Button,
  ButtonLink,
  Card,
  CardHeader,
  IconComponent,
  Modal,
  VStack,
} from '@shared/elements/ui';
import { useOpenClose } from '@shared/lib/hooks/useOpenClose';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { BooksCreateReportForm } from '../BooksCreateReportForm/BooksCreateReportForm';

const cnBooksListItem = cn('BooksListItem');

interface BooksListItemProps {
  className?: string;
  book: BookResponseType;
}

export const BooksListItem: FC<BooksListItemProps> = observer((props) => {
  const { className, book } = props;

  const { screen } = useGlobalStore();

  const isScreenDownMd = screen.downMd;

  const { open, handleOpen, handleClose } = useOpenClose();

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
          <Button
            fullWidth
            onClick={handleOpen}
            addonRight={<IconComponent name={'ReportIcon'} size={'sm'} />}
          >
            Добавить отчёт
          </Button>
          <Modal
            fullScreen={isScreenDownMd}
            onClose={handleClose}
            open={open}
            title={`Создать отчёт для ${book.name}`}
          >
            <BooksCreateReportForm bookId={book.id} />
          </Modal>
          <Button fullWidth variant={'outlined'} disabled>
            {UiTextConstant.edit()}
          </Button>
        </VStack>
      </VStack>
    </Card>
  );
});
