import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import initializeTestSuiteObserver from "./testSuiteObserver";

const componentName = document.body.dataset.componentName;
if (componentName) initializeTestSuiteObserver(componentName);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
