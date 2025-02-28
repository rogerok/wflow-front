import './styles/SignUpForm.scss';

import { cn } from '@bem-react/classname';
import { UserCreateRequestType } from '@shared/api';
import {
  DatePickerInput,
  FormComponent,
  TextInput,
} from '@shared/elements/components';
import { Button, HStack, Paper, Typography, VStack } from '@shared/elements/ui';
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
    <Paper
      className={cnSignUpForm(undefined, [props.className])}
      elevation={3}
      rounded={3}
      py={'32'}
      px={'32'}
    >
      <FormComponent<UserCreateRequestType>
        onSubmit={service.submitForm}
        form={service.userForm}
      >
        <VStack className={cnSignUpForm('Inner')} gap={'16'}>
          <Typography>Данные</Typography>
          <HStack gap={'16'}>
            <TextInput field={userForm.fields.firstName} placeholder={'Имя'} />
            <TextInput
              field={userForm.fields.lastName}
              placeholder={'Фамилия'}
            />
            <TextInput
              field={userForm.fields.middleName}
              placeholder={'Отчество'}
            />
            <DatePickerInput
              field={userForm.fields.bornDate}
              placeholderText={'Дата рождения'}
              showMonthDropdown
              showYearDropdown
            />
          </HStack>
          <HStack gap={'16'}>
            <TextInput field={userForm.fields.email} placeholder={'Почта'} />
            <TextInput
              field={userForm.fields.password}
              placeholder={'Пароль'}
            />
            <TextInput
              field={userForm.fields.passwordConfirm}
              placeholder={'Подтвердите пароль'}
            />
          </HStack>

          <Typography>Псевдоним</Typography>
          <HStack gap={'16'}>
            <TextInput
              field={userForm.fields.pseudonym.fields.firstName}
              placeholder={'Имя'}
            />
            <TextInput
              field={userForm.fields.pseudonym.fields.lastName}
              placeholder={'Фамилия'}
            />
            <TextInput
              field={userForm.fields.pseudonym.fields.lastName}
              placeholder={'Отчество'}
            />
          </HStack>
          <Typography>Социальные сети</Typography>

          <HStack gap={'16'}>
            <TextInput
              field={userForm.fields.socialLinks.fields.instagram}
              placeholder={'Инстаграм'}
            />
            <TextInput
              field={userForm.fields.socialLinks.fields.telegram}
              placeholder={'Телеграм'}
            />
            <TextInput
              field={userForm.fields.socialLinks.fields.tiktok}
              placeholder={'ТикТок'}
            />
            <TextInput
              field={userForm.fields.socialLinks.fields.vk}
              placeholder={'ВК'}
            />
          </HStack>
        </VStack>
        <Button
          type={'submit'}
          disabled={userForm.isSubmitting}
          className={cnSignUpForm('Button')}
        >
          Отправить
        </Button>
      </FormComponent>
    </Paper>
  );
};
