import './Navbar.scss';

import { cn } from '@bem-react/classname';
import { NavbarLinksType, Overlay, useGlobalStore } from '@shared';
import { useLocation } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { NavbarLink } from './NavbarLink/NavbarLink';
import { NavbarLogoutButton } from './NavbarLogoutButton/NavbarLogoutButton';
import { NavbarToggleButton } from './NavbarToggleButton/NavbarToggleButton';

const cnNavbar = cn('Navbar');

interface NavbarProps {
  links: NavbarLinksType[];
}

export const Navbar: FC<NavbarProps> = observer((props) => {
  const { navbar, screen, userService } = useGlobalStore();

  const close = navbar.close;
  const location = useLocation();

  console.log(userService.role);

  useEffect(() => {
    if (screen.downMd) {
      close();
    }
  }, [close, location.pathname, screen.downMd]);

  return (
    <>
      {!navbar.isCollapsed && screen.downMd && (
        <Overlay className={cnNavbar('Overlay')} onClick={close} />
      )}
      <nav
        className={cnNavbar(
          { collapsed: navbar.isCollapsed, expanded: !navbar.isCollapsed },
          [],
        )}
      >
        <NavbarToggleButton className={cnNavbar('ToggleButton')} />
        {props.links.map(
          (link) =>
            link.roles.includes(userService.role) && (
              <NavbarLink
                className={cnNavbar('Link')}
                key={link.to}
                link={link}
                collapsed={navbar.isCollapsed}
              />
            ),
        )}
        {userService.userData && (
          <NavbarLogoutButton className={cnNavbar('LogoutButton')} />
        )}
      </nav>
    </>
  );
});
