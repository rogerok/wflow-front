import { cn } from '@bem-react/classname';
import { Button, FormComponent, TextInput } from '@shared';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { SignUpService } from '../model/service/SignUpService';

const cnSignUpPage = cn('SignUpPage');

interface SignUpPageProps {
  className?: string;
}

export const SignUpPage: FC<SignUpPageProps> = observer((props) => {
  const [service] = useState(() => new SignUpService());
  const { userForm } = service;

  return (
    <FormComponent
      className={cnSignUpPage(undefined, [props.className])}
      onSubmit={service.submitForm}
    >
      <TextInput field={userForm.fields.firstName} />
      <TextInput field={userForm.fields.lastName} />
      <Button type={'submit'}>submit</Button>
    </FormComponent>
  );
});
