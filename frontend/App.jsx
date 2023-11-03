// styles
import './styles/App.css'

// imports 
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// components
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
