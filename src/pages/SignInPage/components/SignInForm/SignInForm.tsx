import { cn } from '@bem-react/classname';
import { FormComponent } from '@shared';
import { FC } from 'react';

const cnSignInForm = cn('SignInForm');

interface SignInFormProps {
  className?: string;
}

export const SignInForm: FC<SignInFormProps> = (props) => {
  return (
    <FormComponent
      className={cnSignInForm(undefined, [props.className])}
      onSubmit={function (): Promise<void> {
        throw new Error('Function not implemented.');
      }}
    >
      SignInForm
    </FormComponent>
  );
};
