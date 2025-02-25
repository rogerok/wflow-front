import { cn } from '@bem-react/classname';
import { ReportCreateRequestType } from '@shared/api';
import { TextInput } from '@shared/elements/components';
import { GoalsAutocomplete } from '@shared/elements/components/inputs/autocompletes/GoalsAutocomplete/GoalsAutocomplete';
import { VStack } from '@shared/elements/ui';
import { useFormStore } from '@shared/lib';
import { FC } from 'react';

const cnBookCreateReportFormFields = cn('BookCreateReportFormFields');

interface FormFieldsProps {
  className?: string;
}

export const BookCreateReportFormFields: FC<FormFieldsProps> = (props) => {
  const form = useFormStore<ReportCreateRequestType>();

  return (
    <VStack
      className={cnBookCreateReportFormFields(undefined, [props.className])}
      fullWidth
      gap={'24'}
      mb={'16'}
    >
      <GoalsAutocomplete
        field={form.fields.goalId}
        label={'Цель'}
        bookId={form.fields.bookId.value}
      />
      <TextInput label={'Название'} field={form.fields.title} fullWidth />
      <TextInput label={'Описание'} field={form.fields.description} fullWidth />
      <TextInput
        label={'Количество слов'}
        field={form.fields.wordsAmount}
        type={'number'}
        fullWidth
      />
    </VStack>
  );
};
