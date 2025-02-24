import { cn } from '@bem-react/classname';
import { TextInput } from '@shared/elements/components';
import { VStack } from '@shared/elements/ui';
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
    const { className } = props;
    const form = useFormStore<ReportCreateRequestType>();

    return (
      <VStack
        className={cnReportCreateFormFields(undefined, [className])}
        fullWidth
        gap={'24'}
        mb={'16'}
      >
        <TextInput label={'Описание'} field={form.fields.title} fullWidth />
        <TextInput
          label={'Описание'}
          field={form.fields.description}
          fullWidth
        />
        <TextInput
          label={'Количество слов'}
          field={form.fields.wordsAmount}
          type={'number'}
          fullWidth
        />
      </VStack>
    );
  },
);
