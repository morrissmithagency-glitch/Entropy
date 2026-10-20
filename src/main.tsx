import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Gallery } from './dev/Gallery'
import './styles/global.css'

const gallery = import.meta.env.DEV && location.search.includes('gallery')

createRoot(document.getElementById('root')!).render(<StrictMode>{gallery ? <Gallery /> : <App />}</StrictMode>)
