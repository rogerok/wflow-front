import { cn } from '@bem-react/classname';
import { FormComponent, TextInput } from '@shared/elements/components';
import { Button, Page, VStack } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { SignUpService } from '../model/services/SignUpService';
import { UserCreateRequestType } from '../model/types/userCreate';

const cnSignUpPage = cn('SignUpPage');

interface SignUpPageProps {
  className?: string;
}

export const SignUpPage: FC<SignUpPageProps> = observer((props) => {
  const [service] = useState(() => new SignUpService());
  const { userForm } = service;

  useEffect(() => {
    return () => {
      service.abortRequest();
    };
  }, [service]);

  return (
    <Page>
      <FormComponent<UserCreateRequestType>
        className={cnSignUpPage(undefined, [props.className])}
        onSubmit={service.submitForm}
        form={service.userForm}
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
