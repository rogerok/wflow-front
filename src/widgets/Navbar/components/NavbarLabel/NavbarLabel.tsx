import './NavbarLabel.scss';

import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';

const cnNavbarLabel = cn('NavbarLabel');

interface NavbarLabelProps {
  className?: string;
  text: string;
  collapsed: boolean;
}

export const NavbarLabel: FC<NavbarLabelProps> = memo((props) => {
  const { className, collapsed, text } = props;

  return (
    <span
      className={cnNavbarLabel(
        {
          collapsed: collapsed,
          expanded: !collapsed,
        },
        [className],
      )}
    >
      {text}
    </span>
  );
});
