import { FC, ReactNode, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  container?: Element | DocumentFragment;
  className?: string;
}

export const Portal: FC<PortalProps> = (props): ReactPortal => {
  const { children, container = document.body } = props;

  return createPortal(children, container);
};
