import { cn } from '@bem-react/classname';
import {
  Button,
  FormComponent,
  Page,
  TextInput,
  useGlobalStore,
  VStack,
} from '@shared';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { AuthController } from '../../../shared/services/auth/authController';
import { AuthService } from '../../../shared/services/auth/authService';

const cnSignInPage = cn('SignInPage');

interface SignInPageProps {
  className?: string;
}

export const SignInPage: FC<SignInPageProps> = observer((props) => {
  const { userService } = useGlobalStore();

  const [authController] = useState(
    () => new AuthController(new AuthService(), userService),
  );

  return (
    <Page className={cnSignInPage(undefined, [props.className])}>
      <FormComponent onSubmit={authController.authenticate}>
        <VStack gap={'8'}>
          <TextInput
            field={authController.authService.authForm.fields.email}
            placeholder={'Email'}
          />
          <TextInput
            field={authController.authService.authForm.fields.password}
            placeholder={'Пароль'}
          />
          <Button type={'submit'}>Войти</Button>
        </VStack>
      </FormComponent>
    </Page>
  );
});
