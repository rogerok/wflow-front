import { cn } from '@bem-react/classname';
import { ReportCreateRequestType } from '@shared/api';
import { FormComponent } from '@shared/elements/components';
import { Button } from '@shared/elements/ui';
import { ReportCreateService } from '@shared/services';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

const cnReportCreateForm = cn('ReportCreateForm');

interface ReportCreateFormProps {
  bookId?: string;
  className?: string;
  goalId?: string;
  service: ReportCreateService;
  fields: ReactNode;
}

export const ReportCreateForm: FC<ReportCreateFormProps> = observer((props) => {
  const { className, service, fields } = props;

  return (
    <FormComponent<ReportCreateRequestType>
      className={cnReportCreateForm(undefined, [className])}
      onSubmit={service.submit}
      form={service.form}
    >
      {fields}
      <Button type={'submit'} disabled={service.form.isSubmitting}>
        Отправить
      </Button>
    </FormComponent>
  );
});
