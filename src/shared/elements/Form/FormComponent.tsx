import { cn } from '@bem-react/classname';
import { FC, FormEvent, ReactNode } from 'react';

const cnFormComponent = cn('FormComponent');

interface FormComponentProps {
  className?: string;
  children: ReactNode;
  onSubmit: () => Promise<void>;
  onReset?: () => void;
}

export const FormComponent: FC<FormComponentProps> = (props) => {
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    await props.onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cnFormComponent(undefined, [props.className])}
    >
      {props.children}
    </form>
  );
};
