import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextProvider from './ContextProvider/ContextProvider';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { store } from './DataFetch.js/store';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store} >
          <App />

        </Provider>
      </QueryClientProvider>
    </ContextProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
