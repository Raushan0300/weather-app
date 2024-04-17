import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import Weather from './components/Weather/Weather'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/weather' element={<Weather />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
