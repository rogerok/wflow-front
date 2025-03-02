import { cn } from '@bem-react/classname';
import { ReportCreateRequestType } from '@shared/api';
import { TextInput } from '@shared/elements/components/inputs/TextInput/TextInput';
import { VStack } from '@shared/elements/ui';
import { useFormStore } from '@shared/lib';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const cnGoalReportFormFields = cn('GoalReportFormFields');

interface GoalReportFormFieldsProps {
  className?: string;
}

export const GoalReportFormFields: FC<GoalReportFormFieldsProps> = observer(
  (props) => {
    const form = useFormStore<ReportCreateRequestType>();

    return (
      <VStack
        className={cnGoalReportFormFields(undefined, [props.className])}
        fullWidth
        gap={'24'}
        mb={'16'}
      >
        <TextInput label={'Название'} field={form.fields.title} fullWidth />
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
