import { cn } from '@bem-react/classname';
import { Page, Typography, VStack } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { SignInForm } from '../components/SignInForm/SignInForm';

const cnSignInPage = cn('SignInPage');

interface SignInPageProps {
  className?: string;
}

export const SignInPage: FC<SignInPageProps> = observer((props) => {
  return (
    <Page className={cnSignInPage(undefined, [props.className])}>
      <VStack as={'section'} gap={'32'}>
        <Typography
          as={'h1'}
          size={'xl'}
          fullWidth
          align={'center'}
          className={cnSignInPage('Title')}
        >
          Авторизация
        </Typography>
        <SignInForm />
      </VStack>
    </Page>
  );
});
