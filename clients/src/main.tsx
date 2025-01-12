import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Redux Provider
import App from './App.tsx';
import './index.css';
import  store  from './store/index.ts';  // Import your Redux store

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap your app with the Redux Provider */}
      <App />
    </Provider>
  </StrictMode>
);
