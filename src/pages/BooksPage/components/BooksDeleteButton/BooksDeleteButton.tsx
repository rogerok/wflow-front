import { deleteBook } from '@shared/api';
import { UiTextConstant } from '@shared/const';
import {
  Button,
  HStack,
  IconComponent,
  Modal,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { useOpenClose } from '@shared/lib/hooks/useOpenClose';
import { RequestStore, useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { useBooksContext } from '../../model/hooks/useBooksContext';

interface BooksDeleteButtonProps {
  bookId: string;
  bookName: string;
}

export const BooksDeleteButton: FC<BooksDeleteButtonProps> = observer(
  (props) => {
    const [request] = useState(
      () =>
        new RequestStore(deleteBook, {
          error: 'Ошибка при удалении книги',
        }),
    );

    const { open, handleOpen, handleClose } = useOpenClose();
    const { bookId, bookName } = props;
    const { screen } = useGlobalStore();

    const booksService = useBooksContext();

    const handleDelete = async (): Promise<void> => {
      await request.call(bookId);

      if (request.result.status === 'success') {
        await booksService.list();
        handleClose();
      }
    };

    return (
      <>
        <Button
          fullWidth
          variant={'warn'}
          onClick={handleOpen}
          addonRight={<IconComponent name={'BinIcon'} size={'sm'} />}
        >
          Удалить книгу
        </Button>
        <Modal
          fullScreen={screen.downMd}
          onClose={handleClose}
          open={open}
          title={`Удалить книгу ${bookName}`}
        >
          <VStack gap={'64'} fullHeight>
            <VStack as={'p'} gap={'16'} flexJustify={'center'}>
              <Typography
                variant={'warn'}
                size={'l'}
                weight={'bold'}
                align={'center'}
              >
                Внимание!
              </Typography>
              <Typography variant={'warn'} weight={'bold'} align={'center'}>
                При удалении книги так же будут удалены все цели, отчёты
                статистика этой книги.
              </Typography>
            </VStack>

            <HStack flexJustify={'between'} gap={'64'} mt={'auto'}>
              <Button
                fullWidth={screen.downMd}
                variant={'warn'}
                disabled={request.isLoading}
                onClick={handleDelete}
                addonRight={<IconComponent name={'BinIcon'} size={'sm'} />}
              >
                {UiTextConstant.delete('книгу')}
              </Button>
              <Button
                fullWidth={screen.downMd}
                disabled={request.isLoading || booksService.isLoading}
                onClick={handleClose}
              >
                {UiTextConstant.cancel()}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </>
    );
  },
);
