import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnSignUpFormFields = cn('SignUpFormFields');

interface SignUpFormFieldsProps {
  className?: string;
}

export const SignUpFormFields: FC<SignUpFormFieldsProps> = (props) => {
  return (
    <div className={cnSignUpFormFields(undefined, [props.className])}>
      SignUpFormFields
    </div>
  );
};