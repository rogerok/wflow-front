import { cn } from '@bem-react/classname';
import { ReportCreateRequestType } from '@shared/api';
import { FormComponent } from '@shared/elements/components';
import { Button } from '@shared/elements/ui';
import { ReportCreateService } from '@shared/services';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useEffect, useState } from 'react';

import { reportFormDefaultValues } from '../model/constants/constants';
import { ReportCreateFormFields } from './ReportCreateFormFields';

const cnReportCreateForm = cn('ReportCreateForm');

interface ReportCreateFormProps {
  bookId?: string;
  className?: string;
  goalId?: string;
  service?: ReportCreateService;
  fields?: ReactNode;
}

export const ReportCreateForm: FC<ReportCreateFormProps> = observer((props) => {
  const { className, goalId, bookId, service, fields } = props;

  const [createService] = useState(
    () =>
      service ??
      new ReportCreateService({
        ...reportFormDefaultValues,
        bookId: bookId || '',
        goalId: goalId || '',
      }),
  );

  useEffect(() => {
    return () => {
      createService.abortRequest();
    };
  }, [createService]);

  return (
    <FormComponent<ReportCreateRequestType>
      className={cnReportCreateForm(undefined, [className])}
      onSubmit={createService.submit}
      form={createService.form}
    >
      {fields ? fields : <ReportCreateFormFields />}
      <Button type={'submit'} disabled={createService.form.isSubmitting}>
        Отправить
      </Button>
    </FormComponent>
  );
});
