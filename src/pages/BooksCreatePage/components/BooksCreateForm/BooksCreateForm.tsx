import { cn } from '@bem-react/classname';
import { BookFormRequestType } from '@shared/api';
import { UiTextConstant } from '@shared/const';
import {
  FormComponent,
  FormTextArea,
  TextInput,
} from '@shared/elements/components';
import { Button, VStack } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { BooksCreateService } from '../../model/services/booksCreateService';

const cnBooksCreateForm = cn('BooksCreateForm');

interface BooksCreateFormProps {
  className?: string;
}

export const BooksCreateForm: FC<BooksCreateFormProps> = observer((props) => {
  const { router } = useGlobalStore();

  const [service] = useState(() => new BooksCreateService(router));

  return (
    <FormComponent<BookFormRequestType>
      form={service.form}
      onSubmit={service.submitForm}
      className={cnBooksCreateForm(undefined, [props.className])}
    >
      <VStack gap={'16'}>
        <TextInput
          field={service.form.fields.name}
          label={'Название книги'}
          fullWidth
          required
        />
        <FormTextArea
          label={'Описание'}
          fullWidth
          rows={20}
          field={service.form.fields.description}
        />
        <Button type={'submit'} disabled={service.form.isSubmitting}>
          {UiTextConstant.post()}
        </Button>
      </VStack>
    </FormComponent>
  );
});
