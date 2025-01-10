import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { FC, FormEvent, ReactNode } from 'react';

const cnFormComponent = cn('FormComponent');

interface FormComponentProps {
  className?: string;
  children: ReactNode;
  onSubmit: () => Promise<void>;
  onReset?: () => void;
}

export const FormComponent: FC<FormComponentProps> = observer((props) => {
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
});
