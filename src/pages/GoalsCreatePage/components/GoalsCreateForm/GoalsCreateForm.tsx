import { cn } from '@bem-react/classname';
import { UiTextConstant } from '@shared/const';
import {
  BooksAutocomplete,
  DatePickerInput,
  FormComponent,
  FormTextArea,
  TextInput,
} from '@shared/elements/components';
import { Button, VStack } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { GoalsCreateService } from '../../model/services/GoalsCreateService';
import { GoalCreateFormType } from '../../model/types/createGoal';

const cnGoalsCreateForm = cn('GoalsCreateForm');

interface GoalsCreateFormProps {
  className?: string;
}

export const GoalsCreateForm: FC<GoalsCreateFormProps> = observer((props) => {
  const { router } = useGlobalStore();

  const [service] = useState(() => new GoalsCreateService(router));

  const {
    form: { fields },
  } = service;

  useEffect(() => {
    return () => {
      service.abortRequest();
    };
  }, [service]);

  const minDate = new Date();

  return (
    <FormComponent<GoalCreateFormType>
      className={cnGoalsCreateForm(undefined, [props.className])}
      onSubmit={service.submit}
      form={service.form}
    >
      <VStack gap={'16'} fullWidth>
        <TextInput
          field={fields.title}
          fullWidth
          label={'Название цели'}
          required
        />
        <FormTextArea field={fields.description} fullWidth label={'Описание'} />
        <BooksAutocomplete
          label={'Книга'}
          field={fields.bookId}
          fullWidth
          required
        />
        <TextInput
          label={'Количество слов'}
          type={'number'}
          field={fields.goalWords}
          fullWidth
          required
        />
        <DatePickerInput
          label={'Дата начала'}
          field={fields.startDate}
          minDate={minDate}
          showMonthDropdown
          showYearDropdown
          fullWidth
          required
        />
        <DatePickerInput
          label={'Дата завершения'}
          field={fields.endDate}
          minDate={minDate}
          showMonthDropdown
          showYearDropdown
          fullWidth
          required
        />
        <Button type={'submit'} disabled={service.form.isSubmitting}>
          {UiTextConstant.post()}
        </Button>
      </VStack>
    </FormComponent>
  );
});
