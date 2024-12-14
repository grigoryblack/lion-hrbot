import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppServices from "./App.serivce.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppServices />
  </StrictMode>,
)
