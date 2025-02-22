import { cn } from '@bem-react/classname';
import { useFormStore } from '@shared/lib';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { ReportCreateRequestType } from '../model/types/report';

const cnReportCreateFormFields = cn('ReportCreateFormFields');

interface ReportCreateFormFieldsProps {
  className?: string;
}

export const ReportCreateFormFields: FC<ReportCreateFormFieldsProps> = observer(
  (props) => {
    const form = useFormStore<ReportCreateRequestType>();

    console.log(form.fields.description.value);

    return (
      <div className={cnReportCreateFormFields(undefined, [props.className])}>
        ReportCreateFormFields
      </div>
    );
  },
);
