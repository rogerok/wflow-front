import './SignUpPage.scss';

import { cn } from '@bem-react/classname';
import { Page, PageTitle, Typography } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { SignUpForm } from './SignUpForm/SignUpForm';

const cnSignUpPage = cn('SignUpPage');

export const SignUpPage: FC = observer(() => {
  return (
    <Page className={cnSignUpPage('SignUpPage')}>
      <PageTitle title={'Регистрация'} />
      <Typography
        align={'center'}
        variant={'accent'}
        as={'h1'}
        size={'xl'}
        weight={'bold'}
      >
        Регистрация
      </Typography>
      <SignUpForm />
    </Page>
  );
});
