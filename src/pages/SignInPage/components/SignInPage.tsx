import { cn } from '@bem-react/classname';
import { Button, FormComponent, Page, TextInput, VStack } from '@shared';
import { FC, useState } from 'react';

import { AuthService } from '../model/services/AuthService';

const cnSignInPage = cn('SignInPage');

interface SignInPageProps {
  className?: string;
}

export const SignInPage: FC<SignInPageProps> = (props) => {
  const [authService] = useState(() => new AuthService());

  return (
    <Page className={cnSignInPage(undefined, [props.className])}>
      <FormComponent onSubmit={authService.submitForm}>
        <VStack gap={'8'}>
          <TextInput
            field={authService.authForm.fields.email}
            placeholder={'Email'}
          />
          <TextInput
            field={authService.authForm.fields.password}
            placeholder={'Пароль'}
          />
          <Button type={'submit'}>Войти</Button>
        </VStack>
      </FormComponent>
    </Page>
  );
};
