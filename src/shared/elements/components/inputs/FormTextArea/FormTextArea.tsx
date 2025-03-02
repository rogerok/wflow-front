import { cn } from '@bem-react/classname';
import DOMPurify from 'dompurify';
import { observer } from 'mobx-react-lite';
import { ComponentProps, FC } from 'react';

import { TextField } from '../../../../lib';
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

export const FormTextArea: FC<FormTextAreaProps> = observer((props) => {
  const { className, field, ...restProps } = props;
  const { value, setValue, error, name } = field;

  const handleChange = (value: string): void => {
    setValue(DOMPurify.sanitize(value));
  };

  return (
    <TextArea
      className={cnFormTextArea(undefined, [props.className])}
      value={value}
      onChange={handleChange}
      error={error}
      name={name}
      {...restProps}
    />
  );
});
