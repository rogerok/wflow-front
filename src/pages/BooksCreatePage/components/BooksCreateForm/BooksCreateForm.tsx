import { cn } from '@bem-react/classname';
import { BookCreateService } from '@pages/BooksCreatePage/model/services/BookCreateService';
import { Button, FormComponent, TextInput, VStack } from '@shared/elements';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

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
        <TextInput
          label={'Описание книги'}
          field={service.form.fields.description}
          fullWidth
        />
        <Button type={'submit'} disabled={service.form.isSubmitting}>
          Отправить
        </Button>
      </VStack>
    </FormComponent>
  );
});
