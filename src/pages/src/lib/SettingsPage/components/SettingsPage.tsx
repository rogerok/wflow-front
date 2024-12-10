import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnSettingsPage = cn('SettingsPage');

interface SettingsPageProps {
  className?: string;
}

export const SettingsPage: FC<SettingsPageProps> = (props) => {
  return (
    <div className={cnSettingsPage(undefined, [props.className])}>
      SettingsPage
    </div>
  );
};