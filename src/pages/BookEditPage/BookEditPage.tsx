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

import { BookEditFacade } from './model/services/bookEditFacade';

const cnBookEditPage = cn('BookEditPage');

interface BookEditPageProps {
  className?: string;
}

const route = getRouteApi('/_protected/books/edit/$bookId');

export const BookEditPage: FC<BookEditPageProps> = observer((props) => {
  const params = route.useParams().bookId;
  const [facade] = useState(() => new BookEditFacade(params));

  useEffect(() => {
    facade.init();
  }, [facade]);

  return (
    <Page className={cnBookEditPage(undefined, [props.className])}>
      <PageSeo
        title={facade.book?.name}
        description={facade.book?.description}
      />
      <ButtonLink to={routes.books()}>Назад</ButtonLink>
      {facade.loading ? (
        <Loader />
      ) : (
        <FormComponent<BookFormRequestType>
          form={facade.form}
          onSubmit={facade.submitForm}
        >
          <VStack gap={'16'}>
            <TextInput
              field={facade.form.fields.name}
              label={'Название книги'}
              fullWidth
            />
            <FormTextArea
              label={'Описание'}
              fullWidth
              rows={20}
              field={facade.form.fields.description}
            />
            <Button type={'submit'} disabled={facade.submitting}>
              {UiTextConstant.post()}
            </Button>
          </VStack>
        </FormComponent>
      )}
    </Page>
  );
});
