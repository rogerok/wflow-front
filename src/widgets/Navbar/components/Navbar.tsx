import './Navbar.scss';

import { cn } from '@bem-react/classname';
import { NavbarLinksType, Overlay, useGlobalStore } from '@shared';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { NavbarLink } from './NavbarLink/NavbarLink';
import { NavbarLogoutButton } from './NavbarLogoutButton/NavbarLogoutButton';
import { NavbarToggleButton } from './NavbarToggleButton/NavbarToggleButton';

const cnNavbar = cn('Navbar');

interface NavbarProps {
  links: NavbarLinksType[];
}

export const Navbar: FC<NavbarProps> = observer((props) => {
  const { navbar, screen, userService } = useGlobalStore();

  return (
    <>
      {!navbar.isCollapsed && screen.downMd && (
        <Overlay className={cnNavbar('Overlay')} onClick={navbar.toggle} />
      )}
      <nav
        className={cnNavbar(
          { collapsed: navbar.isCollapsed, expanded: !navbar.isCollapsed },
          [],
        )}
      >
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

        <NavbarToggleButton
          className={cnNavbar('ToggleButton', {
            expanded: !navbar.isCollapsed,
          })}
        />
      </nav>
    </>
  );
});
