import './Navbar.scss';

import { cn } from '@bem-react/classname';
import { NavbarLinks } from '@shared/const';
import { Overlay } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

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

  return (
    <div className={cnNavbar(undefined, [props.className])}>
      {!navbar.isCollapsed && screen.downMd && (
        <Overlay className={cnNavbar('Overlay')} onClick={close} />
      )}
      <nav
        className={cnNavbar(
          'Inner',
          { collapsed: navbar.isCollapsed, expanded: !navbar.isCollapsed },
          [props.className],
        )}
      >
        <NavbarToggleButton className={cnNavbar('ToggleButton')} />
        {NavbarLinks.map(
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
    </div>
  );
});
