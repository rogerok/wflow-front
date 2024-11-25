import './styles/index.scss';

import { cn } from '@bem-react/classname';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { MainLayout } from '@wflow-front/shared';
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

const Card = ({
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

const Navbar = ({
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
  const theme = 'dark';

  return (
    <div
      className={cnApp({
        theme: theme,
      })}
    >
      <MainLayout
        header={<Card title="Dark header" description={''} />}
        content={<RouterProvider router={router} />}
        navbar={<Navbar title="Dark Navbar" description={''} />}
      />
    </div>
  );
}

export default observer(App);
