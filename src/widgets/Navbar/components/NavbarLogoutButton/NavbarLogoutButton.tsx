import './NavbarLogoutButton.scss';

import { cn } from '@bem-react/classname';
import { Button, IconComponent, useGlobalStore } from '@shared';
import { useNavigate } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { NavbarLabel } from '../NavbarLabel/NavbarLabel';

const cnNavbarLogoutButton = cn('NavbarLogoutButton');

interface NavbarLogoutButtonProps {
  className?: string;
}

export const NavbarLogoutButton: FC<NavbarLogoutButtonProps> = observer(
  (props) => {
    const { authController, navbar } = useGlobalStore();

    const navigate = useNavigate();

    return (
      <Button
        className={cnNavbarLogoutButton(undefined, [props.className])}
        variant={'clear'}
        onClick={() => authController.logout(navigate)}
        addonLeft={
          <IconComponent
            className={cnNavbarLogoutButton('Icon')}
            name={'LogoutIcon'}
            size={'sm'}
            color={'basic-secondary-4'}
          />
        }
      >
        <NavbarLabel text={'Выход'} collapsed={navbar.isCollapsed} />
      </Button>
    );
  },
);
