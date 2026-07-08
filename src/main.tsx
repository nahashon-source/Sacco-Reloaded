import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { env } from '@/config/env';

import './styles/globals.css';
import './styles/theme.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Root element with id "root" was not found. Check that index.html contains <div id="root"></div>.'
  );
}

const renderApp = () => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Mocks are opt-in via VITE_ENABLE_MOCKS so this can never accidentally run
// in a real production build pointed at the actual backend.
if (env.enableMocks) {
  import('@/mocks/browser').then(({ worker }) => {
    worker.start({ onUnhandledRequest: 'bypass' }).then(renderApp);
  });
} else {
  renderApp();
}
