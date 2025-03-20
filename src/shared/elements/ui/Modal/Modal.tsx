import './Modal.scss';

import { cn } from '@bem-react/classname';
import { FC, MouseEvent, ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useKeyDown } from '../../../lib';
import { HStack } from '../HStack/HStack';
import { IconComponent } from '../IconComponent/IconComponent';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import { Typography } from '../Typography/Typography';

const cnModal = cn('Modal');

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'fullScreen';

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

  const handlePressContent = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <Portal container={document.body.querySelector('.App') ?? document.body}>
      <CSSTransition
        in={open}
        timeout={300}
        classNames="Modal-Transition"
        unmountOnExit
        nodeRef={ref}
      >
        <div className={cnModal(undefined, [className])}>
          <Overlay className={cnModal('ModalOverlay')} onClick={handleClose} />

          <div
            className={cnModal('Content', {
              fullScreen: fullScreen,
              size: size,
            })}
            ref={ref}
            onClick={handlePressContent}
          >
            <HStack align={'center'} flexJustify={'between'} wrap={'nowrap'}>
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
                color={'brand-accent-3'}
              />
            </HStack>

            {children}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};
