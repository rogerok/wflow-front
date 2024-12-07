import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { IconComponent, useGlobalStore } from '@wflow-front/shared';
import { observer } from 'mobx-react-lite';

const cNavbarToggleButton = cn('NavbarToggleButton');

interface NavbarToggleButtonProps {
  className?: string;
}

export const NavbarToggleButton: FC<NavbarToggleButtonProps> = observer(
  (props) => {
    const { ui } = useGlobalStore();

    return (
      <IconComponent
        className={cNavbarToggleButton(undefined, [props.className])}
        name={ui.isNavbarCollapsed ? 'SidebarShowIcon' : 'SidebarHideIcon'}
        onClick={ui.toggleNavbar}
        color={ui.isNavbarCollapsed ? 'basic-secondary-4' : 'brand-primary'}
        size={'md'}
      />
    );
  }
);
