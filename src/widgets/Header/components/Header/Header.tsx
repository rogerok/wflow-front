import './Header.scss';

import { cn } from '@bem-react/classname';
import { Flex, IconComponent } from '@shared';
import { FC } from 'react';

import { ThemeSwitcher } from '../ThemeSwitcher/components/ThemeSwitcher';

const cnHeader = cn('Header');

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <Flex
      className={cnHeader(undefined, [props.className])}
      as={'header'}
      direction={'row'}
      flexJustify={'between'}
    >
      <IconComponent name={'LogoIcon'} width={40} height={40} />
      <ThemeSwitcher />
    </Flex>
  );
};
