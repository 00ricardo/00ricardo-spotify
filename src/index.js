import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from './components/Application';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Import your Redux store
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <div className='background'>
        <Application />
      </div>
    </Provider>
  </QueryClientProvider>

);
