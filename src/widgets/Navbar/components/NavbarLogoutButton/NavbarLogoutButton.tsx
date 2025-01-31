import './NavbarLogoutButton.scss';

import { cn } from '@bem-react/classname';
import { Button, IconComponent } from '@shared/elements';
import { useGlobalStore } from '@shared/stores';
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

    return (
      <Button
        className={cnNavbarLogoutButton(undefined, [props.className])}
        variant={'clear'}
        onClick={() => authController.logout()}
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
