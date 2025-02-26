import './Modal.scss';

import { cn } from '@bem-react/classname';
import { FC, ReactNode, useEffect, useRef } from 'react';

import { handleClickOutside, useKeyDown } from '../../../lib';
import { HStack } from '../HStack/HStack';
import { IconComponent } from '../IconComponent/IconComponent';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import { Typography } from '../Typography/Typography';

const cnModal = cn('Modal');

type ModalSize = 'xs' | 'sm' | 'md' | 'lg';

interface ModalProps {
  className?: string;
  fullScreen?: boolean;
  onClose?: () => void;
  open?: boolean;
  size?: ModalSize;
  title?: string;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    className,
    onClose,
    fullScreen,
    open,
    title,
    size = 'md',
    children,
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClose = (): void => {
    onClose?.();
  };

  useKeyDown({
    keyCode: 'Escape',
    callBack: handleClose,
  });

  useEffect(() => {
    const outsideClickListener = handleClickOutside({
      callback: () => onClose?.(),
      ref: ref,
    });

    document.addEventListener('mousedown', outsideClickListener);
    document.addEventListener('touchend', outsideClickListener);

    return () => {
      document.removeEventListener('mousedown', outsideClickListener);
      document.removeEventListener('touchend', outsideClickListener);
    };
  }, [onClose]);

  return (
    open && (
      <Portal container={document.body.querySelector('.App') ?? document.body}>
        <div className={cnModal(undefined, [className])}>
          <Overlay className={cnModal('ModalOverlay')} />
          <div
            className={cnModal('Content', {
              fullScreen: fullScreen,
              size: size,
            })}
            ref={ref}
          >
            <HStack pt={'16'} pb={'16'} flexJustify={'between'} wrap={'nowrap'}>
              {title && (
                <Typography
                  className={cnModal('Title')}
                  as={'h4'}
                  variant={'accent'}
                  size={'l'}
                  weight={'semibold'}
                >
                  {title}
                </Typography>
              )}
              <IconComponent
                className={cnModal('CloseButton')}
                name={'CloseIcon'}
                size={'lg'}
                onClick={handleClose}
              />
            </HStack>
            {children}
          </div>
        </div>
      </Portal>
    )
  );
};
