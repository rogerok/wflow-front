import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnSignUpPage = cn('SignUpPage');

interface SignUpPageProps {
  className?: string;
}

export const SignUpPage: FC<SignUpPageProps> = (props) => {
  return (
    <div className={cnSignUpPage(undefined, [props.className])}>SignUpPage</div>
  );
};
