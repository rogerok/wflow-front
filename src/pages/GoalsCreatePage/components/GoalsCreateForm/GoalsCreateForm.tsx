import { cn } from '@bem-react/classname';
import {
  BooksAutocomplete,
  DatePickerInput,
  FormComponent,
  FormTextArea,
  TextInput,
} from '@shared/elements/components';
import { Button, VStack } from '@shared/elements/ui';
import { toJS } from 'mobx';
import { FC, useState } from 'react';

import { GoalsCreateService } from '../../model/services/GoalsCreateService';

const cnGoalsCreateForm = cn('GoalsCreateForm');

interface GoalsCreateFormProps {
  className?: string;
}

export const GoalsCreateForm: FC<GoalsCreateFormProps> = (props) => {
  const [service] = useState(() => new GoalsCreateService());

  const {
    form: { fields },
  } = service;

  console.log(toJS(service.form.errors));

  return (
    <FormComponent
      className={cnGoalsCreateForm(undefined, [props.className])}
      onSubmit={service.submit}
    >
      <VStack gap={'16'} fullWidth>
        <TextInput field={fields.title} fullWidth label={'Название цели'} />
        <FormTextArea field={fields.description} fullWidth label={'Описание'} />
        <BooksAutocomplete label={'Книга'} field={fields.bookId} fullWidth />
        <TextInput
          field={fields.goalWords}
          fullWidth
          label={'Количество слов'}
          type={'number'}
        />
        <DatePickerInput
          field={fields.startDate}
          label={'Дата начала'}
          fullWidth
        />
        <DatePickerInput
          field={fields.endDate}
          label={'Дата завершения'}
          fullWidth
        />
        <Button type={'submit'} disabled={service.form.isSubmitting}>
          Отправить
        </Button>
      </VStack>
    </FormComponent>
  );
};
