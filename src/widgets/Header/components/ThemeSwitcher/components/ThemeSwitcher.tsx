import { cn } from '@bem-react/classname';
import { IconComponent } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const cnThemeSwitcher = cn('ThemeSwitcher');

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = observer((props) => {
  const { theme } = useGlobalStore();

  return (
    <IconComponent
      dataTestId={'ThemeSwitcher'}
      className={cnThemeSwitcher(undefined, [props.className])}
      name={theme.isDark ? 'MoonIcon' : 'SunIcon'}
      size={'md'}
      onClick={theme.toggle}
    />
  );
});
