import './Spinner.scss';

import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnSpinner = cn('Spinner');

interface SpinnerProps {
  className?: string;
}

export const Spinner: FC<SpinnerProps> = (props) => {
  return (
    <div className={cnSpinner(undefined, [props.className])}>
      <div className={cnSpinner('Item')} />
      <div className={cnSpinner('Item')} />
      <div className={cnSpinner('Item')} />
      <div className={cnSpinner('Item')} />
    </div>
  );
};
