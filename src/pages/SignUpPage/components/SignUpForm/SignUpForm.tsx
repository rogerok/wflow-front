import './styles/SignUpForm.scss';

import { cn } from '@bem-react/classname';
import { UiTextConstant } from '@shared/const';
import {
  DatePickerInput,
  FormComponent,
  TextInput,
} from '@shared/elements/components';
import { Button, Col, Grid, Paper, Row, Typography } from '@shared/elements/ui';
import { FC, useEffect, useState } from 'react';

import { SignUpService } from '../../model/services/SignUpService';
import { UserCreateFormType } from '../../model/types/userCreate';

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
    <Grid className={cnSignUpForm('Inner')}>
      <Paper
        className={cnSignUpForm(undefined, [props.className])}
        elevation={3}
        rounded={3}
        py={'32'}
        px={'16'}
        fullWidth
      >
        <FormComponent<UserCreateFormType>
          onSubmit={service.submitForm}
          form={service.userForm}
        >
          <Typography>Данные</Typography>
          <Row spacing={2} vSpacing={1}>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.firstName}
                placeholder={'Имя'}
                fullWidth
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.lastName}
                placeholder={'Фамилия'}
                fullWidth
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.middleName}
                placeholder={'Отчество'}
                fullWidth
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <DatePickerInput
                field={userForm.fields.bornDate}
                placeholderText={'Дата рождения'}
                showMonthDropdown
                showYearDropdown
                fullWidth
              />
            </Col>
          </Row>

          <Row spacing={2} vSpacing={1}>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.email}
                placeholder={'Почта'}
                fullWidth
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.password}
                placeholder={'Пароль'}
                fullWidth
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.passwordConfirm}
                placeholder={'Подтвердите пароль'}
                fullWidth
              />
            </Col>
          </Row>

          <Typography>Псевдоним</Typography>

          <Row spacing={2} vSpacing={1}>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.pseudonymFirstName}
                placeholder={'Имя'}
                fullWidth
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.pseudonymLastName}
                placeholder={'Фамилия'}
                fullWidth
              />
            </Col>
          </Row>

          <Typography>Социальные сети</Typography>
          <Row spacing={2} vSpacing={1}>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.socialLinks.fields.instagram}
                placeholder={'Инстаграм'}
                fullWidth
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.socialLinks.fields.telegram}
                placeholder={'Телеграм'}
                fullWidth
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.socialLinks.fields.tiktok}
                placeholder={'ТикТок'}
                fullWidth
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <TextInput
                field={userForm.fields.socialLinks.fields.vk}
                placeholder={'Вк'}
                fullWidth
              />
            </Col>
          </Row>
          <Button
            type={'submit'}
            disabled={userForm.isSubmitting}
            className={cnSignUpForm('Button')}
          >
            {UiTextConstant.post()}
          </Button>
        </FormComponent>
      </Paper>
    </Grid>
  );
};
