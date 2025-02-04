import { cn } from '@bem-react/classname';
import { ComponentProps, FC } from 'react';

import { TextField } from '../../../../lib/form';
import { TextArea } from '../../../ui/TextArea/TextArea';

const cnFormTextArea = cn('FormTextArea');

type HTMLTextAreaProps = Omit<
  ComponentProps<typeof TextArea>,
  'value' | 'onChange' | 'readOnly'
>;

interface FormTextAreaProps extends HTMLTextAreaProps {
  className?: string;
  field: TextField<string>;
}

export const FormTextArea: FC<FormTextAreaProps> = (props) => {
  return (
    <div className={cnFormTextArea(undefined, [props.className])}>
      FormTextArea
    </div>
  );
};
