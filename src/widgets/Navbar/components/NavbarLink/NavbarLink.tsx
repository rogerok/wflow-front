import './NavbarLink.scss';

import { cn } from '@bem-react/classname';
import { AppLink } from '@shared/elements/ui';
import { FC, memo } from 'react';

import { NavbarLinksType } from '../../model/constants/links';
import { NavbarLabel } from '../NavbarLabel/NavbarLabel';

const cnNavbarLink = cn('NavbarLink');

interface NavbarLabelProps {
  collapsed: boolean;
  link: NavbarLinksType;
  onClick?: () => void;
  className?: string;
}

export const NavbarLink: FC<NavbarLabelProps> = memo((props) => {
  const { className, link, collapsed, onClick } = props;

  return (
    <AppLink
      className={cnNavbarLink(undefined, [className])}
      to={link.to}
      onClick={onClick}
    >
      {({ isActive }) => (
        <div
          className={cnNavbarLink('Inner', {
            collapsed: collapsed,
          })}
        >
          <div
            className={cnNavbarLink('Icon', {
              active: isActive,
              collapsed: collapsed,
            })}
          >
            {isActive ? link.active : link.inActive}
          </div>
          <NavbarLabel text={link.label} collapsed={collapsed} />
        </div>
      )}
    </AppLink>
  );
});
