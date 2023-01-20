import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// todo: dev;

if (import.meta.env.DEV === true) {
  // const mockModule = import('./mocks/browser');
  // mockModule.then((module) => {
  //   module.worker.start();
  // });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
