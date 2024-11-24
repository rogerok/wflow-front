import './app.scss';

import { ReactElement } from 'react';

import NxWelcome from './nx-welcome';

// https://dev.to/this-is-learning/architects-delight-enforcing-layers-and-project-boundaries-with-nx-2d8o
// https://blog.nrwl.io/mastering-the-project-boundaries-in-nx-f095852f5bf4
export function App(): ReactElement {
  return (
    <div className={'Hello'}>
      <NxWelcome title="wflow-front" />
    </div>
  );
}

export default App;
