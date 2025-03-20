import { cn } from '@bem-react/classname';
import { ReportCreateRequestType } from '@shared/api';
import { UiTextConstant } from '@shared/const';
import { ReportCreateFormDefaultValues } from '@shared/const/reports/reportsConstants';
import {
  FormComponent,
  GoalsAutocomplete,
  TextInput,
} from '@shared/elements/components';
import { Button, IconComponent, Modal, VStack } from '@shared/elements/ui';
import { useOpenClose } from '@shared/lib/hooks/useOpenClose';
import { ReportCreateService } from '@shared/services';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

const cnBookCreateReportForm = cn('BooksCreateReportForm');

interface BookCreateReportFormProps {
  className?: string;
  bookId: string;
  bookName: string;
}

export const BooksCreateReportForm: FC<BookCreateReportFormProps> = observer(
  (props) => {
    const { bookId, bookName, className } = props;
    const { screen } = useGlobalStore();

    const isScreenDownMd = screen.downMd;

    const { open, handleOpen, handleClose } = useOpenClose();

    const [service] = useState(
      () =>
        new ReportCreateService({
          ...ReportCreateFormDefaultValues,
          bookId: bookId,
        }),
    );

    const { form } = service;

    return (
      <>
        <Button
          fullWidth
          onClick={handleOpen}
          addonRight={<IconComponent name={'ReportIcon'} size={'sm'} />}
        >
          Добавить отчёт
        </Button>
        <Modal
          className={cnBookCreateReportForm(undefined, [className])}
          fullScreen={isScreenDownMd}
          onClose={handleClose}
          open={open}
          title={`Создать отчёт для ${bookName}`}
        >
          <FormComponent<ReportCreateRequestType>
            onSubmit={service.submit}
            form={service.form}
          >
            <VStack fullWidth gap={'24'} mb={'24'}>
              <GoalsAutocomplete
                field={form.fields.goalId}
                label={'Цель'}
                bookId={form.fields.bookId.value}
              />

              <TextInput
                label={'Количество слов'}
                field={form.fields.wordsAmount}
                type={'number'}
                fullWidth
              />
            </VStack>
            <Button type={'submit'} disabled={form.isSubmitting}>
              {UiTextConstant.post()}
            </Button>
          </FormComponent>
        </Modal>
      </>
    );
  },
);
