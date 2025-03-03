import './Header.scss';

import { cn } from '@bem-react/classname';
import { AppLink, Flex, IconComponent, Typography } from '@shared/elements/ui';
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
      <AppLink className={cnHeader('Link')} to={'/'}>
        <IconComponent name={'LogoIcon'} width={40} height={40} />
        <Typography variant={'accent'} size={'l'} weight={'bold'}>
          Word Flow
        </Typography>
      </AppLink>

      <ThemeSwitcher />
    </Flex>
  );
};
