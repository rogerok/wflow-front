import './SignInForm.scss';

import { cn } from '@bem-react/classname';
import { AuthRequestType } from '@shared/api';
import { FormComponent, TextInput } from '@shared/elements/components';
import { Button, Paper, VStack } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const cnSignInForm = cn('SignInForm');

interface SignInFormProps {
  className?: string;
}

export const SignInForm: FC<SignInFormProps> = observer((props) => {
  const { authController, screen } = useGlobalStore();
  const {
    authService: { authForm },
  } = authController;

  return (
    <Paper
      className={cnSignInForm(undefined, [props.className])}
      elevation={3}
      rounded={3}
      py={'32'}
      px={'16'}
      fullWidth
    >
      <FormComponent<AuthRequestType>
        onSubmit={authController.authenticate}
        form={authForm}
      >
        <VStack
          className={cnSignInForm('Fields')}
          gap={'16'}
          flexJustify={'center'}
          align={'center'}
        >
          <TextInput
            field={authForm.fields.email}
            placeholder={'Email'}
            fullWidth
          />
          <TextInput
            field={authForm.fields.password}
            placeholder={'Пароль'}
            type={'password'}
            fullWidth
          />
        </VStack>
        <Button
          className={cnSignInForm('Button')}
          type={'submit'}
          fullWidth={screen.downMd}
        >
          Войти
        </Button>
      </FormComponent>
    </Paper>
  );
});
