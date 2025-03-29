import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import ApiService from "../../service/ApiService";



function Navbar() {
    //These methods check local storage for a token and role (stored during login):
    const isAuthenticated = ApiService.isAuthenticated();
    const isCustomer = ApiService.isCustomer();
    const isAdmin = ApiService.isAdmin();

    //Hook from React Router to programmatically redirect the user after logout.
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm("Are you sure you want to logout?")
        if (isLogout) {
            ApiService.logout();  // removes token and role
            navigate("/home");     //// redirect to homepage
        }
    }

    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home"> Auriela Hotels </NavLink>
            </div>

            <ul className="navbar-ul">
                <li><NavLink to={"/home"} activeClassname="active">Home</NavLink></li>
                <li><NavLink to={"/rooms"} activeClassname="active">Rooms</NavLink></li>
                <li><NavLink to={"/find-booking"} activeClassname="active">Find My Bookings</NavLink></li>

                { isCustomer && <li><NavLink to={"/profile"} activeClassname="active">Profile</NavLink></li>}
                {isAdmin && <li><NavLink to={"/admin"} activeClassname="active">Admin</NavLink></li>}

                {!isAuthenticated && <li><NavLink to={"/login"} activeClassname="active">Login</NavLink></li>}
                {!isAuthenticated && <li><NavLink to={"/register"} activeClassname="active">Register</NavLink></li>}

                {isAuthenticated && <li onClick={handleLogout}>Logout</li>}
            </ul>
        </nav>
    )
}

export default Navbar;