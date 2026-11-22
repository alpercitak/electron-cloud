import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/home';
import './styles/global.css';

const elem = document.getElementById('root');
if (!elem) {
  throw new Error('Missing #root element');
}

const app = (
  <StrictMode>
    <Home />
  </StrictMode>
);

createRoot(elem).render(app);
