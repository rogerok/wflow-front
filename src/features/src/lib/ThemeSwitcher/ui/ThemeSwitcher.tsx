import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { IconComponent, ThemeStore } from '@wflow-front/shared';

const cnThemeSwitcher = cn('ThemeSwitcher');

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = observer((props) => {
  return (
    <IconComponent
      className={cnThemeSwitcher(undefined, [props.className])}
      name={ThemeStore.isDark ? 'MoonIcon' : 'SunIcon'}
      size={'md'}
      onClick={ThemeStore.toggleTheme}
    />
  );
});
