import './NavbarItem.scss';

import { cn } from '@bem-react/classname';
import { AppLink, NavbarLinksType } from '@shared';
import { FC, memo, ReactNode } from 'react';

const cnNavbarItem = cn('NavbarItem');

interface NavbarItemProps {
  collapsed: boolean;
  link: NavbarLinksType;
  className?: string;
}

export const NavbarItem: FC<NavbarItemProps> = memo((props) => {
  const { className, link, collapsed } = props;

  return (
    <AppLink className={cnNavbarItem(undefined, [className])} to={link.to}>
      {({ isActive }): ReactNode => {
        return (
          <div className={cnNavbarItem('Inner')}>
            <div
              className={cnNavbarItem('Icon', {
                active: isActive,
              })}
            >
              {isActive ? link.active : link.inActive}
            </div>
            <span
              className={cnNavbarItem('Label', {
                collapsed: collapsed,
                expanded: !collapsed,
              })}
            >
              {link.label}
            </span>
          </div>
        );
      }}
    </AppLink>
  );
});
