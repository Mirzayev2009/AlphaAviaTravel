import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/travel.css'
import AppStartup from './components/AppStartup'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <AppStartup />
  </StrictMode>,
)
