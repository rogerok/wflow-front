import { GoalResponseType } from '@shared/api';
import { Button, Modal } from '@shared/elements/ui';
import { useOpenClose } from '@shared/lib/hooks/useOpenClose';
import { useGlobalStore } from '@shared/stores';
import { GoalReportForm } from '@widgets/GoalReportForm';
import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';

import { BookContext } from '../../model/context/BookContext';

interface BookReportFormProps {
  goal: GoalResponseType;
}

export const BookReportForm: FC<BookReportFormProps> = observer((props) => {
  const { goal } = props;
  const { screen } = useGlobalStore();
  const { open, handleOpen, handleClose } = useOpenClose();

  const bookFacade = useContext(BookContext);
  const report = bookFacade?.reportForm;

  const isScreenDownMd = screen.downMd;

  const handleFormOpen = (): void => {
    bookFacade?.initReportForm(goal.id);
    handleOpen();
  };

  const onClose = (): void => {
    bookFacade?.abortFormSubmit();
    bookFacade?.destroyReportForm();
    handleClose();
  };

  const handleSubmit = async (): Promise<void> => {
    await bookFacade?.submitReport(goal);
  };

  return (
    <>
      <Button onClick={handleFormOpen} fullWidth={isScreenDownMd}>
        Добавить отчёт
      </Button>
      <Modal
        fullScreen={isScreenDownMd}
        onClose={onClose}
        open={open}
        title={`Создать отчёт для ${goal.title}`}
      >
        {report?.form && (
          <GoalReportForm reportForm={report.form} onSubmit={handleSubmit} />
        )}
      </Modal>
    </>
  );
});
