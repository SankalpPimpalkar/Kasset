import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import VideoContextProvider from './context/VideoContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <VideoContextProvider>
        <App />
      </VideoContextProvider>
    </BrowserRouter>
  </StrictMode>
)
