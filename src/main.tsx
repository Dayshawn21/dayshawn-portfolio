import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

const root = document.getElementById('root');
if (!root) throw new Error('The portfolio root element is missing.');
const application = <StrictMode><App /></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, application);
else createRoot(root).render(application);
