import { cn } from '@bem-react/classname';
import { Page } from '@shared';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

export const HomePage: FC<HomePageProps> = observer((props) => {
  return (
    <Page className={cnHomePage(undefined, [props.className])}>home page</Page>
  );
});
