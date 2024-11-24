import './app.scss';

import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ReactElement } from 'react';

import { routeTree } from '../routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App(): ReactElement {
  return (
    <div className={'Hello'}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
