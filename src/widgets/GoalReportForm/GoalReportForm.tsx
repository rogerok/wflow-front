import { cn } from '@bem-react/classname';
import { ReportCreateRequestType } from '@shared/api';
import { FormComponent } from '@shared/elements/components/Form/FormComponent';
import { Button } from '@shared/elements/ui';
import { FormStore } from '@shared/lib';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { GoalReportFormFields } from './GoalReportFormFields';

const cnGoalReportForm = cn('GoalReportForm');

interface GoalReportFormProps {
  reportForm: FormStore<ReportCreateRequestType>;
  onSubmit: () => Promise<void>;
  className?: string;
}

export const GoalReportForm: FC<GoalReportFormProps> = observer((props) => {
  const { className, onSubmit, reportForm } = props;

  return (
    <FormComponent<ReportCreateRequestType>
      className={cnGoalReportForm(undefined, [className])}
      onSubmit={onSubmit}
      form={reportForm}
    >
      <GoalReportFormFields />
      <Button type={'submit'} disabled={reportForm.isSubmitting}>
        Отправить
      </Button>
    </FormComponent>
  );
});
