import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { IconComponent } from '@wflow-front/shared';
import { ThemeSwitcher } from '@wflow-front/features';

const cnHeader = cn('Header');

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <header className={cnHeader(undefined, [props.className])}>
      <IconComponent name={'LogoIcon'} width={40} height={40} />
      <ThemeSwitcher />
    </header>
  );
};
