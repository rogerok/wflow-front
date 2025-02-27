import './styles/SignUpForm.scss';

import { cn } from '@bem-react/classname';
import { UserCreateRequestType } from '@shared/api';
import { FormComponent, TextInput } from '@shared/elements/components';
import { Button, VStack } from '@shared/elements/ui';
import { FC, useEffect, useState } from 'react';

import { SignUpService } from '../../model/services/SignUpService';

const cnSignUpForm = cn('SignUpForm');

interface SignUpFormProps {
  className?: string;
}

export const SignUpForm: FC<SignUpFormProps> = (props) => {
  const [service] = useState(() => new SignUpService());
  const { userForm } = service;

  useEffect(() => {
    return () => {
      service.abortRequest();
    };
  }, [service]);

  return (
    <FormComponent<UserCreateRequestType>
      className={cnSignUpForm(undefined, [props.className])}
      onSubmit={service.submitForm}
      form={service.userForm}
    >
      <VStack
        className={cnSignUpForm('Inner')}
        gap={'16'}
        pt={'32'}
        pb={'32'}
        flexJustify={'center'}
        align={'center'}
      >
        <TextInput
          field={userForm.fields.firstName}
          placeholder={'Имя'}
          fullWidth
        />
        <TextInput
          field={userForm.fields.email}
          placeholder={'Почта'}
          fullWidth
        />
        <TextInput
          field={userForm.fields.password}
          placeholder={'Пароль'}
          fullWidth
        />
        <TextInput
          field={userForm.fields.passwordConfirm}
          placeholder={'Подтвердите пароль'}
          fullWidth
        />
      </VStack>
      <Button type={'submit'} disabled={userForm.isSubmitting}>
        Отправить
      </Button>
    </FormComponent>
  );
};
