import { cn } from '@bem-react/classname';
import { VStack } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const cnReportCreateFormFields = cn('ReportCreateFormFields');

interface ReportCreateFormFieldsProps {
  className?: string;
}

export const ReportCreateFormFields: FC<ReportCreateFormFieldsProps> = observer(
  (props) => {
    const { className } = props;

    return (
      <VStack
        className={cnReportCreateFormFields(undefined, [className])}
        fullWidth
        gap={'24'}
        mb={'16'}
      >
        {/*<TextInput label={'Название'} field={form.fields.title} fullWidth />*/}
        {/*<TextInput*/}
        {/*  label={'Описание'}*/}
        {/*  field={form.fields.description}*/}
        {/*  fullWidth*/}
        {/*/>*/}
        {/*<TextInput*/}
        {/*  label={'Количество слов'}*/}
        {/*  field={form.fields.wordsAmount}*/}
        {/*  type={'number'}*/}
        {/*  fullWidth*/}
        {/*/>*/}
      </VStack>
    );
  },
);
