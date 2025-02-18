import { cn } from '@bem-react/classname';
import {
  BooksAutocomplete,
  FormComponent,
  TextInput,
} from '@shared/elements/components';
import { VStack } from '@shared/elements/ui';
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

  return (
    <FormComponent
      className={cnGoalsCreateForm(undefined, [props.className])}
      onSubmit={service.submit}
    >
      <VStack gap={'16'}>
        <TextInput field={fields.title} label={'Название цели'} fullWidth />
        <BooksAutocomplete field={fields.bookId} />
      </VStack>
    </FormComponent>
  );
};
