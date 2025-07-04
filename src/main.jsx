import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@material-tailwind/react';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
      <Toaster toastOptions={{ duration: 2000 }} />
    </ThemeProvider>
  </Provider>
);
