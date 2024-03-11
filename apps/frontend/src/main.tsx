import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import '@/src/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
