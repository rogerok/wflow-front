import { FC } from 'react';
import { cn } from '@bem-react/classname';
import './Navbar.scss';
import { NavbarLinksType, Overlay, useGlobalStore } from '@wflow-front/shared';
import { NavbarItem } from './NavbarItem/NavbarItem';
import { NavbarToggleButton } from './NavbarToggleButton/NavbarToggleButton';
import { observer } from 'mobx-react-lite';

const cnNavbar = cn('Navbar');

interface NavbarProps {
  links: NavbarLinksType[];
}

export const Navbar: FC<NavbarProps> = observer((props) => {
  const { navbar, screen } = useGlobalStore();

  return (
    <>
      {!navbar.isCollapsed && screen.downMd && (
        <Overlay className={cnNavbar('Overlay')} onClick={navbar.toggle} />
      )}
      <nav
        className={cnNavbar(
          { collapsed: navbar.isCollapsed, expanded: !navbar.isCollapsed },
          []
        )}
      >
        {props.links.map((link) => (
          <NavbarItem
            className={cnNavbar('Link')}
            key={link.to}
            link={link}
            collapsed={navbar.isCollapsed}
          />
        ))}
        <NavbarToggleButton
          className={cnNavbar('ToggleButton', {
            expanded: !navbar.isCollapsed,
          })}
        />
      </nav>
    </>
  );
});
