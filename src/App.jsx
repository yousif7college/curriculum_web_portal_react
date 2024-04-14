import './global.scss'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Colleges from './pages/Colleges/Colleges'
import Departments from './pages/Departments/Departments'
import Courses from './pages/Courses/Courses'
import Teachers from './pages/Teachers/Teachers'
import MyNavbar from './components/MyNavbar/MyNavbar'
import Users from './pages/Users/Users'
import Login from './pages/Login/Login'

function App() {
  const { pathname } = useLocation()
  const isLogin = localStorage.getItem('user')

  return (
    <div className="App">
      {pathname !== '/login' && <MyNavbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Colleges" element={<Colleges />} />
        <Route path="/Departments" element={<Departments />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/teachers" element={<Teachers />} />
        {!isLogin ?
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </>
          : <>
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </>
        }
      </Routes>
    </div>
  )
}

export default App
