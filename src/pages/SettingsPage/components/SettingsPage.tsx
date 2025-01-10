import { cn } from '@bem-react/classname';
import { useGlobalStore } from '@shared';
import { FC, useEffect } from 'react';

const cnSettingsPage = cn('SettingsPage');

interface SettingsPageProps {
  className?: string;
}

export const SettingsPage: FC<SettingsPageProps> = (props) => {
  const { userService } = useGlobalStore();

  useEffect(() => {
    userService.fetchUsers();
  }, []);

  return (
    <div className={cnSettingsPage(undefined, [props.className])}>
      SettingsPage
    </div>
  );
};
