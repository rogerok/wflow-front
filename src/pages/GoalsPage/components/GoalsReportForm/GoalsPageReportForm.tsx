import { GoalResponseType } from '@shared/api';
import { Button, Modal } from '@shared/elements/ui';
import { useOpenClose } from '@shared/lib/hooks/useOpenClose';
import { useGlobalStore } from '@shared/stores';
import { GoalReportForm } from '@widgets/GoalReportForm';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useGoalsContext } from '../../model/hooks/useGoalsContext';

interface GoalsReportFormProps {
  className?: string;
  goal: GoalResponseType;
}

export const GoalsPageReportForm: FC<GoalsReportFormProps> = observer(
  (props) => {
    const { goal } = props;

    const { screen } = useGlobalStore();
    const isScreenDownMd = screen.downMd;

    const goalFacade = useGoalsContext();
    const report = goalFacade?.reportForm;

    const { open, handleOpen, handleClose } = useOpenClose();

    const handleFormOpen = (): void => {
      goalFacade?.initReportForm(goal);
      handleOpen();
    };

    useEffect(() => {
      return () => {
        goalFacade?.abortFormSubmit();
        goalFacade?.destroyReportForm();
      };
    }, [goalFacade]);

    const handleSubmit = async (): Promise<void> => {
      await goalFacade?.submitReport(goal);
    };

    return (
      <>
        <Button onClick={handleFormOpen} fullWidth={isScreenDownMd}>
          Добавить отчёт
        </Button>
        <Modal
          fullScreen={isScreenDownMd}
          onClose={handleClose}
          open={open}
          title={`Создать отчёт для ${goal.title}`}
        >
          {report?.form && (
            <GoalReportForm reportForm={report.form} onSubmit={handleSubmit} />
          )}
        </Modal>
      </>
    );
  },
);
