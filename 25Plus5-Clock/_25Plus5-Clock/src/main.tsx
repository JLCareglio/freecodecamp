import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import initializeTestSuiteObserver from './utils/testSuiteObserver';
import './index.css';

initializeTestSuiteObserver();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
