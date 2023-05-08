import React from 'react'
import {Link, useMatch, useResolvedPath} from 'react-router-dom'
import "./components_style/NavBar.css"

export default function NavBar() {
  return (
    <nav className="nav"> 
        <ul>
            <CustomLink to="/">Main</CustomLink>
            <CustomLink to="/Schedule">Schedule</CustomLink>
            <CustomLink to="/About">About</CustomLink>
            <CustomLink to="/Feedback">Feedback</CustomLink>
            <CustomLink to="/RedeemTicket">Redeem Ticket</CustomLink>
            <CustomLink to="/AddMovie">Add Movie</CustomLink>
            <CustomLink to="/Login">Login</CustomLink>
        </ul>
    </nav>
  )
}

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
        <li className={isActive? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
