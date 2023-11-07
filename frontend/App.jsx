// styles
import './styles/App.css'

// imports 
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// components
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import EditProfile from './components/profile/EditProfile.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
