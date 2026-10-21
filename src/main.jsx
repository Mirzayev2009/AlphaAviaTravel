import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/travel.css'
import { ready } from "./i18n";
import App from './App.jsx'



ready.then(() => createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
))
