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
import { FC } from 'react';

const cnSignInPage = cn('SignInPage');

interface SignInPageProps {
  className?: string;
}

export const SignInPage: FC<SignInPageProps> = observer((props) => {
  const { authController } = useGlobalStore();
  const {
    authService: { authForm },
  } = authController;

  return (
    <Page className={cnSignInPage(undefined, [props.className])}>
      <FormComponent onSubmit={authController.authenticate}>
        <VStack gap={'8'}>
          <TextInput field={authForm.fields.email} placeholder={'Email'} />
          <TextInput field={authForm.fields.password} placeholder={'Пароль'} />
          <Button type={'submit'}>Войти</Button>
        </VStack>
      </FormComponent>
    </Page>
  );
});
