import { cn } from '@bem-react/classname';
import { ReportCreateRequestType } from '@shared/api';
import { ReportCreateFormDefaultValues } from '@shared/const/reports/reportsConstants';
import { FormComponent, TextInput } from '@shared/elements/components';
import { GoalsAutocomplete } from '@shared/elements/components/inputs/autocompletes/GoalsAutocomplete/GoalsAutocomplete';
import { Button, VStack } from '@shared/elements/ui';
import { ReportCreateService } from '@shared/services';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

const cnBookCreateReportForm = cn('BookCreateReportForm');

interface BookCreateReportFormProps {
  className?: string;
  bookId: string;
}

export const BookCreateReportForm: FC<BookCreateReportFormProps> = observer(
  (props) => {
    const { bookId, className } = props;

    const [service] = useState(
      () =>
        new ReportCreateService({
          ...ReportCreateFormDefaultValues,
          bookId: bookId,
        }),
    );

    const { form } = service;

    return (
      <FormComponent<ReportCreateRequestType>
        onSubmit={service.submit}
        form={service.form}
        className={cnBookCreateReportForm(undefined, [className])}
      >
        <VStack fullWidth gap={'24'} mb={'24'}>
          <GoalsAutocomplete
            field={form.fields.goalId}
            label={'Цель'}
            bookId={form.fields.bookId.value}
          />
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
        <Button type={'submit'} disabled={form.isSubmitting}>
          Отправить
        </Button>
      </FormComponent>
    );
  },
);
