import './styles/index.scss';

import { cn } from '@bem-react/classname';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { MainLayout } from '@wflow-front/shared';
import { ThemeStore } from '@wflow-front/shared';
import { Button } from '@wflow-front/shared';
import { observer } from 'mobx-react-lite';
import { ReactElement } from 'react';

import { routeTree } from '../routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cnApp = cn('App');

export const Card = ({
  title,
  description,
}: {
  title: string;
  description: string;
}): ReactElement => {
  return (
    <div className={'card'}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export const Navbar = ({
  title,
  description,
}: {
  title: string;
  description: string;
}): ReactElement => {
  return (
    <div className={'navbar'}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

function App(): ReactElement {
  return (
    <div className={cnApp(undefined, [ThemeStore.theme])}>
      <MainLayout
        header={
          <>
            <Button variant={'clear'} disabled onClick={ThemeStore.toggleTheme}>
              set theme
            </Button>
            <Button
              variant={'outlined'}
              fullWidth
              onClick={ThemeStore.toggleTheme}
            >
              set theme
            </Button>
            <Button fullWidth onClick={ThemeStore.toggleTheme}>
              set theme
            </Button>
            <Button disabled fullWidth onClick={ThemeStore.toggleTheme}>
              set theme
            </Button>
            <Card title="Dark header" description={''} />
          </>
        }
        content={<RouterProvider router={router} />}
        navbar={<Navbar title="Dark Navbar" description={''} />}
      />
    </div>
  );
}

export default observer(App);
