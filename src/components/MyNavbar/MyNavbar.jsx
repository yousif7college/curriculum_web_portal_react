import "./MyNavbar.scss"
import logo from "../../assets/images/logo.png"
import { Button, Image } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

export default function MyNavbar() {

    const navigate = useNavigate()

    const isLogin = localStorage.getItem('user')

    const handleLogin = () => {
        navigate("/login")
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate("/login")
    }
    return (
        <nav className="Navbar">
            <div className="left-side">
                <div className="logo-container">
                    <Link to="/home"><Image src={logo} /></Link>
                    <Link to="/home">Curriculm Web Portal</Link>
                </div>
                <div className="pages">
                    <Link to="/home">Home<hr /></Link>
                    <Link to="/colleges">Colleges<hr /></Link>
                    <Link to="/Departments">Departments<hr /></Link>
                    <Link to="/courses">courses<hr /></Link>
                    <Link to="/teachers">teachers<hr /></Link>
                    {isLogin && <Link to="/users">Users<hr /></Link>}


                </div>
            </div>
            <div className="right-side">
                {!isLogin ? <Button variant="outline-light" onClick={handleLogin}>Login</Button>
                    : <Button variant="outline-light" onClick={handleLogout}>Logout</Button>}
            </div>
        </nav>
    )
}