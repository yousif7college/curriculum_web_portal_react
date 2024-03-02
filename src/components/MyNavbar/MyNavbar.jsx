import "./MyNavbar.scss"
import logo from "../../assets/images/logo.png"
import { Button, Image, Navbar, NavDropdown, Offcanvas, Nav } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

export default function MyNavbar() {

    const navigate = useNavigate()

    const handleLogin = () => {
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
                    <Link to="/professors">professors<hr /></Link>
                    <Link to="/users">Users<hr /></Link>
                    
                </div>
            </div>
            <div className="right-side">
                <Button variant="outline-light" onClick={handleLogin}>Login</Button>
                <Image src={logo} />
            </div>
        </nav>
    )
}