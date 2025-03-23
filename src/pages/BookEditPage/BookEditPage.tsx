import { cn } from '@bem-react/classname';
import { BookFormRequestType } from '@shared/api';
import { routes, UiTextConstant } from '@shared/const';
import {
  FormComponent,
  FormTextArea,
  TextInput,
} from '@shared/elements/components';
import {
  Button,
  ButtonLink,
  Loader,
  Page,
  PageSeo,
  VStack,
} from '@shared/elements/ui';
import { getRouteApi } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { BookEditService } from './model/services/bookEditService';

const cnBookEditPage = cn('BookEditPage');

interface BookEditPageProps {
  className?: string;
}

const route = getRouteApi('/_protected/books/edit/$bookId');

export const BookEditPage: FC<BookEditPageProps> = observer((props) => {
  const params = route.useParams().bookId;
  const [service] = useState(() => new BookEditService(params));

  useEffect(() => {
    service.init();
  }, [service]);

  return (
    <Page className={cnBookEditPage(undefined, [props.className])}>
      <PageSeo
        title={service.book?.name}
        description={service.book?.description}
      />
      <ButtonLink to={routes.books()}>Назад</ButtonLink>
      {service.loading ? (
        <Loader />
      ) : (
        <FormComponent<BookFormRequestType>
          form={service.form}
          onSubmit={service.submitForm}
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
              rows={20}
              field={service.form.fields.description}
            />
            <Button type={'submit'} disabled={service.submitting}>
              {UiTextConstant.post()}
            </Button>
          </VStack>
        </FormComponent>
      )}
    </Page>
  );
});
