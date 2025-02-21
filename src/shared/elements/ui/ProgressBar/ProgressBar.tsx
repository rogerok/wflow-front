import './ProgressBar.scss';

import { cn } from '@bem-react/classname';
import { FC, ProgressHTMLAttributes } from 'react';

const cnProgressBar = cn('ProgressBar');

interface ProgressBarProps extends ProgressHTMLAttributes<HTMLProgressElement> {
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <progress
      className={cnProgressBar(undefined, [className])}
      {...restProps}
    />
  );
};
