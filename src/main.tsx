// eslint-disable-next-line
import { scan } from 'react-scan'; // import this BEFORE react
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

if (typeof window !== 'undefined') {
  scan({
    enabled: true,
    showToolbar: false,
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <title>Word Flow - Дневник автора</title>
    <App />
  </StrictMode>,
);
