import { FC, memo, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import { AppLink, HStack } from '@wflow-front/shared';
import './NavbarItem.scss';

const cnNavbarItem = cn('NavbarItem');

interface NavbarItemProps {
  active: ReactNode;
  className?: string;
  inActive: ReactNode;
  label: string;
  to: string;
}

export const NavbarItem: FC<NavbarItemProps> = memo((props) => {
  return (
    <AppLink
      className={cnNavbarItem(undefined, [props.className])}
      to={props.to}
    >
      {({ isActive }): ReactNode => {
        return (
          <HStack align={'center'} gap={'4'}>
            <div
              className={cnNavbarItem('LinkIcon', {
                active: isActive,
              })}
            >
              {isActive ? props.active : props.inActive}
            </div>
            <span className={cnNavbarItem('LinkLabel')}>{props.label}</span>
          </HStack>
        );
      }}
    </AppLink>
  );
});
