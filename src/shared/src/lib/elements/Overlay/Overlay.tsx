import { FC, memo } from 'react';
import { cn } from '@bem-react/classname';
import './Overlay.scss';

const cnOverlay = cn('Overlay');

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay: FC<OverlayProps> = memo((props) => {
  const { className, onClick } = props;

  return (
    <div className={cnOverlay(undefined, [className])} onClick={onClick} />
  );
});
