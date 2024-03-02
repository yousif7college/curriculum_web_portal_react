import './global.scss'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Colleges from './pages/Colleges/Colleges'
import Departments from './pages/Departments/Departments'
import Courses from './pages/Courses/Courses'
import Professors from './pages/Teachers/Professors'
import MyNavbar from './components/MyNavbar/MyNavbar'
import Users from './pages/Users/Users'
import Login from './pages/Login/Login'

function App() {
  const {pathname} = useLocation()
  const isLogin = pathname === "/login"

  return (
    <div className="App">
      {!isLogin && <MyNavbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Colleges" element={<Colleges />} />
        <Route path="/Departments" element={<Departments />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/professors" element={<Professors />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  )
}

export default App
