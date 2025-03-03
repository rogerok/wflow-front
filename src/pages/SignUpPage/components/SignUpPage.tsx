import './SignUpPage.scss';

import { cn } from '@bem-react/classname';
import { Page, PageTitle, Typography } from '@shared/elements/ui';
import { FC } from 'react';

import { SignUpForm } from './SignUpForm/SignUpForm';

const cnSignUpPage = cn('SignUpPage');

export const SignUpPage: FC = () => {
  return (
    <Page className={cnSignUpPage()}>
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
};
