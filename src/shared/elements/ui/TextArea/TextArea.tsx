import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnTextArea = cn('TextArea');

interface TextAreaProps {
  className?: string;
}

export const TextArea: FC<TextAreaProps> = (props) => {
  return (
    <div className={cnTextArea(undefined, [props.className])}>
      TextArea
    </div>
  );
};