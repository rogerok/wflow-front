import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnSignInPage = cn('SignInPage');

interface SignInPageProps {
  className?: string;
}

export const SignInPage: FC<SignInPageProps> = (props) => {
  return (
    <div className={cnSignInPage(undefined, [props.className])}>SignInPage</div>
  );
};
