import './Toast.scss';

import { cn } from '@bem-react/classname';
import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';

const cnToast = cn('Toast');

interface ToastProps {
  className?: string;
}

export const Toast: FC<ToastProps> = (props) => {
  return (
    <ToastContainer
      className={cnToast(undefined, [props.className])}
      autoClose={8000}
      limit={3}
    />
  );
};
