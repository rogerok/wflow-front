import './app.scss';

import { MainLayout, Shared } from '@wflow-front/shared';
import { ReactElement } from 'react';

// https://dev.to/this-is-learning/architects-delight-enforcing-layers-and-project-boundaries-with-nx-2d8o
// https://blog.nrwl.io/mastering-the-project-boundaries-in-nx-f095852f5bf4
export function App(): ReactElement {
  return (
    <div className={'Hello'}>
      <MainLayout />
      <Shared />
    </div>
  );
}

export default App;
