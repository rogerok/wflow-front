import { GoalResponseType, ReportCreateRequestType } from '@shared/api';
import { FormComponent, TextInput } from '@shared/elements/components';
import { Button, Modal, VStack } from '@shared/elements/ui';
import { useOpenClose } from '@shared/lib/hooks/useOpenClose';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';

import { BookContext } from '../../model/contexts/BookContext';

interface BookGoalFormProps {
  goal: GoalResponseType;
}

export const BookGoalForm: FC<BookGoalFormProps> = observer((props) => {
  const { goal } = props;
  const { screen } = useGlobalStore();
  const { open, handleOpen, handleClose } = useOpenClose();

  const bookService = useContext(BookContext);
  const report = bookService?.report;

  const isScreenDownMd = screen.downMd;

  const handleFormOpen = (): void => {
    bookService?.initForm(goal.id);
    handleOpen();
  };

  const handleFormClose = (): void => {
    report?.abortRequest();
    bookService?.destroyForm();
    handleClose();
  };

  return (
    <>
      <Button onClick={handleFormOpen} fullWidth={isScreenDownMd}>
        Добавить отчёт
      </Button>
      <Modal fullScreen={isScreenDownMd} onClose={handleFormClose} open={open}>
        {report && (
          <FormComponent<ReportCreateRequestType>
            onSubmit={() => bookService?.submitForm(goal)}
            form={report.form}
          >
            <VStack fullWidth gap={'24'} mb={'16'}>
              <TextInput
                label={'Название'}
                field={report.form.fields.title}
                fullWidth
              />
              <TextInput
                label={'Описание'}
                field={report.form.fields.description}
                fullWidth
              />
              <TextInput
                label={'Количество слов'}
                field={report.form.fields.wordsAmount}
                type={'number'}
                fullWidth
              />
            </VStack>
            <Button type={'submit'} disabled={report.form.isSubmitting}>
              Отправить
            </Button>
          </FormComponent>
        )}
      </Modal>
    </>
  );
});
