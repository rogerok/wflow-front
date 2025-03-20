import './Loader.scss';

import { cn } from '@bem-react/classname';
import { FC, ReactNode, useEffect, useRef } from 'react';

import { Typography } from '../Typography/Typography';
import { Dots } from './Dots/Dots';
import { Pulse } from './Pulse/Pulse';
import { Spinner } from './Spinner/Spinner';

const cnLoader = cn('Loader');

interface LoaderProps {
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
  message?: ReactNode;
  preventScroll?: boolean;
  fullPage?: boolean;
  overlay?: false;
}

export const Loader: FC<LoaderProps> = ({
  variant = 'spinner',
  className,
  message = 'Загрузка...',
  preventScroll,
  fullPage,
  overlay,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preventScroll && fullPage) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [preventScroll, fullPage]);

  const renderLoader = (): ReactNode => {
    switch (variant) {
      case 'dots':
        return <Dots />;
      case 'pulse':
        return <Pulse />;
      case 'spinner':
      default:
        return <Spinner />;
    }
  };

  return (
    <div ref={nodeRef} className={cnLoader({ fullPage, overlay }, [className])}>
      <div className={cnLoader('Container')}>
        {renderLoader()}

        {message && (
          <Typography className={cnLoader('Message')}>{message}</Typography>
        )}
      </div>
    </div>
  );
};
