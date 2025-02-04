import { cn } from '@bem-react/classname';
import {
  FormComponent,
  FormTextArea,
  TextInput,
} from '@shared/elements/components';
import { Button, VStack } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { BookCreateService } from '../../model/services/BookCreateService';

const cnBooksCreateForm = cn('BooksCreateForm');

interface BooksCreateFormProps {
  className?: string;
}

export const BooksCreateForm: FC<BooksCreateFormProps> = observer((props) => {
  const [service] = useState(() => new BookCreateService());

  return (
    <FormComponent
      onSubmit={service.submitForm}
      className={cnBooksCreateForm(undefined, [props.className])}
    >
      <VStack gap={'16'}>
        <TextInput
          field={service.form.fields.name}
          label={'Название книги'}
          fullWidth
        />
        <FormTextArea
          label={'Описание'}
          fullWidth
          field={service.form.fields.description}
        />
        <Button type={'submit'} disabled={service.form.isSubmitting}>
          Отправить
        </Button>
      </VStack>
    </FormComponent>
  );
});
