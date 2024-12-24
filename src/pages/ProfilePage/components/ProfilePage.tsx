import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnProfilePage = cn('ProfilePage');

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage: FC<ProfilePageProps> = (props) => {
  return (
    <div className={cnProfilePage(undefined, [props.className])}>
      ProfilePage
    </div>
  );
};
