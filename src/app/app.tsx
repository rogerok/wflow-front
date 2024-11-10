import './app.module.scss';

import { ReactElement } from 'react';

import NxWelcome from './nx-welcome';

export function App(): ReactElement {
  return (
    <div>
      <NxWelcome title="wflow-front" />
    </div>
  );
}

export default App;
