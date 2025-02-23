import { cn } from '@bem-react/classname';
import { FormComponent } from '@shared/elements/components';
import { Button } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { ReportCreateFormFields } from '../components/ReportCreateFormFields';
import { reportFormDefaultValues } from '../model/constants/constants';
import { ReportCreateService } from '../model/services/ReportCreateService';
import { ReportCreateRequestType } from '../model/types/report';

const cnReportCreateForm = cn('ReportCreateForm');

interface ReportCreateFormProps {
  bookId?: string;
  className?: string;
  goalId?: string;
}

export const ReportCreateForm: FC<ReportCreateFormProps> = observer((props) => {
  const { className, goalId, bookId } = props;

  const [service] = useState(
    () =>
      new ReportCreateService({
        ...reportFormDefaultValues,
        bookId: bookId || '',
        goalId: goalId || '',
      }),
  );

  useEffect(() => {
    return () => {
      service.abortRequest();
    };
  }, [service]);

  return (
    <FormComponent<ReportCreateRequestType>
      className={cnReportCreateForm(undefined, [className])}
      onSubmit={service.submit}
      form={service.form}
    >
      <ReportCreateFormFields />
      <Button type={'submit'} disabled={service.form.isSubmitting}>
        Отправить
      </Button>
    </FormComponent>
  );
});
