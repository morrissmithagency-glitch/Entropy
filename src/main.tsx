import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Gallery } from './dev/Gallery'
import { Scenes } from './dev/Scenes'
import './styles/global.css'

const gallery = import.meta.env.DEV && location.search.includes('gallery')
const scenes = import.meta.env.DEV && location.search.includes('scenes')

createRoot(document.getElementById('root')!).render(<StrictMode>{scenes ? <Scenes /> : gallery ? <Gallery /> : <App />}</StrictMode>)
