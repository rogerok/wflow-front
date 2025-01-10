import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnSignUpForm = cn('SignUpForm');

interface SignUpFormProps {
  className?: string;
}

export const SignUpForm: FC<SignUpFormProps> = (props) => {
  return (
    <div className={cnSignUpForm(undefined, [props.className])}>SignUpForm</div>
  );
};
