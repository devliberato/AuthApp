import "./Navbar.css"
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login")
    
  }

  const {authenticated, logout} = useContext(AuthContext);
  return (
    <div className='navbar'>
       <ul>
  <li><Link to="/">Home</Link></li>

  {!authenticated ? (
    <>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </>
  ) : (
    <>
    <li><a onClick={handleLogout}>Logout</a></li>
    <li><Link to="/edit">Editar Perfil</Link></li>
    </>
  )}
</ul>

    </div>
  )
}

export default Navbar