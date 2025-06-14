import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from './components/ConfigContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { I18nProvider } from './i18n';
import { patchConsoleLogging } from './utils';
import SuspenseLoader from './suspense-loader';

patchConsoleLogging();

const App = lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={SuspenseLoader()}>
      <ConfigProvider>
        <ErrorBoundary>
          <I18nProvider>
            <App />
          </I18nProvider>
        </ErrorBoundary>
      </ConfigProvider>
    </Suspense>
  </React.StrictMode>
);
