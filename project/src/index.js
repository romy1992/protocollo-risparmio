import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/context';
import { Provider } from 'react-redux';// E' il contenitore del redux con tutte le sue librerie adatte per react
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>{/** Va dichiarato in questa maniera per lo store indicato */}
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>
);

