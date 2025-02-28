import './styles/SignUpForm.scss';

import { cn } from '@bem-react/classname';
import { UserCreateRequestType } from '@shared/api';
import {
  DatePickerInput,
  FormComponent,
  TextInput,
} from '@shared/elements/components';
import { Button, HStack, Paper, Typography } from '@shared/elements/ui';
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
        <HStack
          className={cnSignUpForm('Inner')}
          gap={'16'}
          flexJustify={'center'}
          align={'center'}
          fullWidth
        >
          <TextInput
            field={userForm.fields.firstName}
            placeholder={'Имя'}
            fullWidth
          />
          <TextInput
            field={userForm.fields.lastName}
            placeholder={'Фамилия'}
            fullWidth
          />
          <TextInput
            field={userForm.fields.middleName}
            placeholder={'Отчество'}
            fullWidth
          />
          <DatePickerInput
            field={userForm.fields.bornDate}
            placeholderText={'Дата рождения'}
            showMonthDropdown
            showYearDropdown
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
          <Typography>Псевдоним</Typography>
          <TextInput
            field={userForm.fields.pseudonym.fields.firstName}
            placeholder={'Имя'}
            fullWidth
          />
          <TextInput
            field={userForm.fields.pseudonym.fields.lastName}
            placeholder={'Фамилия'}
            fullWidth
          />
          <TextInput
            field={userForm.fields.pseudonym.fields.lastName}
            placeholder={'Отчество'}
            fullWidth
          />
          <Typography>Социальные сети</Typography>
          <TextInput
            field={userForm.fields.socialLinks.fields.instagram}
            placeholder={'Инстаграм'}
            fullWidth
          />
          <TextInput
            field={userForm.fields.socialLinks.fields.telegram}
            placeholder={'Телеграм'}
            fullWidth
          />
          <TextInput
            field={userForm.fields.socialLinks.fields.tiktok}
            placeholder={'ТикТок'}
            fullWidth
          />
          <TextInput
            field={userForm.fields.socialLinks.fields.vk}
            placeholder={'ВК'}
            fullWidth
          />
          <Button
            type={'submit'}
            disabled={userForm.isSubmitting}
            className={cnSignUpForm('Button')}
          >
            Отправить
          </Button>
        </HStack>
      </FormComponent>
    </Paper>
  );
};
