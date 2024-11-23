import './app.scss';

import { Ui } from '@wflow-front/ui';
import { ReactElement } from 'react';
import { MainLayout } from 'shared/layouts/MainLayout';

import NxWelcome from './nx-welcome';

// https://dev.to/this-is-learning/architects-delight-enforcing-layers-and-project-boundaries-with-nx-2d8o

export function App(): ReactElement {
  return (
    <div className={'Hello'}>
      <MainLayout />
      <NxWelcome title="wflow-front" />
      <Ui />
    </div>
  );
}

export default App;
