import { FC, memo, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import { AppLink, HStack } from '@wflow-front/shared';
import './NavbarItem.scss';

const cnNavbarItem = cn('NavbarItem');

interface NavbarItemProps {
  active: ReactNode;
  collapsed: boolean;
  inActive: ReactNode;
  label: string;
  to: string;
  className?: string;
}

export const NavbarItem: FC<NavbarItemProps> = memo((props) => {
  const { className, to, active, inActive, label, collapsed } = props;

  return (
    <AppLink className={cnNavbarItem(undefined, [className])} to={to}>
      {({ isActive }): ReactNode => {
        return (
          <HStack align={'center'} gap={'4'}>
            <div
              className={cnNavbarItem('Icon', {
                active: isActive,
              })}
            >
              {isActive ? active : inActive}
            </div>
            <span
              className={cnNavbarItem('Label', {
                collapsed: collapsed,
                expanded: !collapsed,
              })}
            >
              {label}
            </span>
          </HStack>
        );
      }}
    </AppLink>
  );
});
