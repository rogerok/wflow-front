import { cn } from '@bem-react/classname';
import { FormComponent, TextInput } from '@shared/elements/components';
import { Button, VStack } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { FC } from 'react';

const cnSignInForm = cn('SignInForm');

interface SignInFormProps {
  className?: string;
}

export const SignInForm: FC<SignInFormProps> = (props) => {
  const { authController } = useGlobalStore();
  const {
    authService: { authForm },
  } = authController;

  return (
    <FormComponent
      className={cnSignInForm(undefined, [props.className])}
      onSubmit={authController.authenticate}
    >
      <VStack gap={'8'}>
        <TextInput field={authForm.fields.email} placeholder={'Email'} />
        <TextInput field={authForm.fields.password} placeholder={'Пароль'} />
        <Button type={'submit'}>Войти</Button>
      </VStack>
    </FormComponent>
  );
};
