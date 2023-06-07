import React, { useContext } from "react";
import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";
import "./components_style/NavBar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";

export default function NavBar() {
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);
  const auth = getAuth();
  const location = useLocation();

  const redirect = () => {
    navigate("/Login");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
    navigate("/Login");
  };

  if (location.pathname === "/Login" || location.pathname === "/Register") {
    return null;
  }

  if (currentUser === null) {
    return (
      <nav className="nav">
        <ul>
          <CustomLink to="/">Main</CustomLink>
          <CustomLink to="/Schedule">Schedule</CustomLink>
          <CustomLink to="/Events">Events</CustomLink>
          <CustomLink to="/Feedback">Feedback</CustomLink>
        </ul>
        <button onClick={redirect}>Login</button>
      </nav>
    );
  } else if (currentUser.email != "admin@yahoo.com") {
    return (
      <nav className="nav">
        <ul>
          <CustomLink to="/">Main</CustomLink>
          <CustomLink to="/Schedule">Schedule</CustomLink>
          <CustomLink to="/Events">Events</CustomLink>
          <CustomLink to="/Feedback">Feedback</CustomLink>
        </ul>
        <b>{currentUser.email}</b>
        <button onClick={logout}>Log out</button>
      </nav>
    );
  } else
    return (
      <nav className="nav">
        <ul>
          <CustomLink to="/">Main</CustomLink>
          <CustomLink to="/Schedule">Schedule</CustomLink>
          <CustomLink to="/Events">Events</CustomLink>
          <CustomLink to="/Feedback">Feedback</CustomLink>
          <CustomLink to="/AddMovie">Add Movie</CustomLink>
          <CustomLink to="/AddEvent">Add Event</CustomLink>
        </ul>
        <b>{currentUser.email}</b>
        <button onClick={logout}>Log out</button>
      </nav>
    );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
