import './NavbarLink.scss';

import { cn } from '@bem-react/classname';
import { NavbarLinksType } from '@shared/const';
import { AppLink } from '@shared/elements';
import { FC, memo } from 'react';

import { NavbarLabel } from '../NavbarLabel/NavbarLabel';

const cnNavbarLabel = cn('NavbarLink');

interface NavbarLabelProps {
  collapsed: boolean;
  link: NavbarLinksType;
  className?: string;
}

export const NavbarLink: FC<NavbarLabelProps> = memo((props) => {
  const { className, link, collapsed } = props;

  return (
    <AppLink className={cnNavbarLabel(undefined, [className])} to={link.to}>
      {({ isActive }) => (
        <div
          className={cnNavbarLabel('Inner', {
            collapsed: collapsed,
          })}
        >
          <div
            className={cnNavbarLabel('Icon', {
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
