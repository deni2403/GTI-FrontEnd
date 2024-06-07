import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { store } from './store.js';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/styles.scss';
import 'react-datepicker/dist/react-datepicker.css';
import id from 'date-fns/locale/id';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
registerLocale('id', id);
setDefaultLocale('id');

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
