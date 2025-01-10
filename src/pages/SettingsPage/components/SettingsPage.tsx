import { cn } from '@bem-react/classname';
import { useGlobalStore } from '@shared';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

const cnSettingsPage = cn('SettingsPage');

interface SettingsPageProps {
  className?: string;
}

export const SettingsPage: FC<SettingsPageProps> = observer((props) => {
  const { userService } = useGlobalStore();

  useEffect(() => {
    userService.fetchUsers();
  }, []);

  return (
    <div className={cnSettingsPage(undefined, [props.className])}>
      SettingsPage
    </div>
  );
});
