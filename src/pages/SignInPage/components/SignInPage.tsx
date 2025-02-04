import { cn } from '@bem-react/classname';
import { SignInForm } from '@pages/SignInPage/components/SignInForm/SignInForm';
import { Page } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const cnSignInPage = cn('SignInPage');

interface SignInPageProps {
  className?: string;
}

export const SignInPage: FC<SignInPageProps> = observer((props) => {
  return (
    <Page className={cnSignInPage(undefined, [props.className])}>
      <SignInForm />
    </Page>
  );
});
