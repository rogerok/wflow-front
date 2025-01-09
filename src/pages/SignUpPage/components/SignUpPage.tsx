import { cn } from '@bem-react/classname';
import { Button, FormComponent, Page, TextInput, VStack } from '@shared';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { SignUpService } from '../model/services/SignUpService';

const cnSignUpPage = cn('SignUpPage');

interface SignUpPageProps {
  className?: string;
}

export const SignUpPage: FC<SignUpPageProps> = observer((props) => {
  const [service] = useState(() => new SignUpService());
  const { userForm } = service;

  return (
    <Page>
      <FormComponent
        className={cnSignUpPage(undefined, [props.className])}
        onSubmit={service.submitForm}
      >
        <VStack gap={'8'}>
          Регистрация
          <TextInput
            field={userForm.fields.firstName}
            placeholder={'Имя'}
            required
          />
          <TextInput field={userForm.fields.email} placeholder={'Почта'} />
          <TextInput field={userForm.fields.password} placeholder={'Пароль'} />
          <TextInput
            field={userForm.fields.passwordConfirm}
            placeholder={'Подтвердите пароль'}
          />
          <Button type={'submit'} disabled={userForm.isSubmitting}>
            Отправить
          </Button>
        </VStack>
      </FormComponent>
    </Page>
  );
});
