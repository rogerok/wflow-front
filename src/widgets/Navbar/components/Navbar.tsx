import './Navbar.scss';

import { cn } from '@bem-react/classname';
import { Overlay } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { NavbarLinks } from '../model/constants/links';
import { NavbarLink } from './NavbarLink/NavbarLink';
import { NavbarLogoutButton } from './NavbarLogoutButton/NavbarLogoutButton';
import { NavbarToggleButton } from './NavbarToggleButton/NavbarToggleButton';

const cnNavbar = cn('Navbar');

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = observer((props) => {
  const { navbar, screen, userService } = useGlobalStore();

  const close = navbar.close;

  const closeOnNavigate = (): void => {
    if (screen.downMd) {
      close();
    }
  };

  return (
    <div
      className={cnNavbar(undefined, [props.className])}
      data-testid="Navbar"
    >
      {!navbar.isCollapsed && screen.downMd && (
        <Overlay className={cnNavbar('Overlay')} onClick={close} />
      )}
      <nav
        className={cnNavbar('Inner', {
          collapsed: navbar.isCollapsed,
          expanded: !navbar.isCollapsed,
        })}
        data-testid="NavbarInner"
      >
        <NavbarToggleButton className={cnNavbar('ToggleButton')} />
        {NavbarLinks.map(
          (link) =>
            link.roles.includes(userService.role) &&
            !link.disabled && (
              <NavbarLink
                className={cnNavbar('Link')}
                key={link.to}
                link={link}
                collapsed={navbar.isCollapsed}
                onClick={closeOnNavigate}
              />
            ),
        )}
        {userService.userData && (
          <NavbarLogoutButton className={cnNavbar('LogoutButton')} />
        )}
      </nav>
    </div>
  );
});
