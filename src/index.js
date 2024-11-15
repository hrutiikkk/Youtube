import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import appStore from './Utils/Store/appStore';
import { RouterProvider } from 'react-router-dom';
import appRouter from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
