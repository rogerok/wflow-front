import './NavbarToggleButton.scss';

import { cn } from '@bem-react/classname';
import { IconComponent } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const cNavbarToggleButton = cn('NavbarToggleButton');

interface NavbarToggleButtonProps {
  className?: string;
}

export const NavbarToggleButton: FC<NavbarToggleButtonProps> = observer(
  (props) => {
    const { navbar } = useGlobalStore();

    return (
      <IconComponent
        className={cNavbarToggleButton({ expanded: !navbar.isCollapsed }, [
          props.className,
        ])}
        name={navbar.isCollapsed ? 'DoubleArrowRight' : 'DoubleArrowLeft'}
        onClick={navbar.toggle}
        color={navbar.isCollapsed ? 'basic-secondary-4' : 'brand-primary'}
        size={'md'}
      />
    );
  },
);
