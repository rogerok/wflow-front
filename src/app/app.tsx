import './app.scss';

import { ReactElement } from 'react';

import NxWelcome from './nx-welcome';

export function App(): ReactElement {
  return (
    <div className={'Hello'}>
      <NxWelcome title="wflow-front" />
    </div>
  );
}

export default App;
