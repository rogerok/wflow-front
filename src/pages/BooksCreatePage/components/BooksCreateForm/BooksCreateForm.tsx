import { cn } from '@bem-react/classname';
import { BookFormRequestType } from '@shared/api';
import { UiTextConstant } from '@shared/const';
import {
  FormComponent,
  FormTextArea,
  TextInput,
} from '@shared/elements/components';
import { Button, VStack } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { BooksCreateService } from '../../model/services/BooksCreateService';

const cnBooksCreateForm = cn('BooksCreateForm');

interface BooksCreateFormProps {
  className?: string;
}

export const BooksCreateForm: FC<BooksCreateFormProps> = observer((props) => {
  const [service] = useState(() => new BooksCreateService());

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
        />
        <FormTextArea
          label={'Описание'}
          fullWidth
          field={service.form.fields.description}
        />
        <Button type={'submit'} disabled={service.form.isSubmitting}>
          {UiTextConstant.post()}
        </Button>
      </VStack>
    </FormComponent>
  );
});
