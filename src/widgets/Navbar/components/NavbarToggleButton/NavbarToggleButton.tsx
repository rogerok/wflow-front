import { cn } from '@bem-react/classname';
import { IconComponent, useGlobalStore } from '@shared';
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
        className={cNavbarToggleButton(undefined, [props.className])}
        name={navbar.isCollapsed ? 'SidebarShowIcon' : 'SidebarHideIcon'}
        onClick={navbar.toggle}
        color={navbar.isCollapsed ? 'basic-secondary-4' : 'brand-primary'}
        size={'md'}
      />
    );
  }
);
