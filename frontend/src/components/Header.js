import React, {useState} from "react";
import logo from "../img/logo.png";
import bell from "../img/Bell.png";
import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function Header(props) {

  const { isAuthenticated, user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) {
  return null; // или spinner
}
  const getImageUrl = (path) => {
  if (!path) return "/default-avatar.png";
  return `http://127.0.0.1:8000${path}`;
};

  return <header className="header">
    <div className="header__inner">
      <div className="header__left">
        <Link to={`/`} className="logo">
          <img src={logo} alt="Logo"/>
        </Link>
        <div className="divider"/>
        <nav className="nav">
          <Link to="/discover">Discover</Link>
          <Link to="/how-it-works">How it work</Link>
        </nav>
      </div>

      {/* Правый блок */}
      <div className="header__right">
        <form className="search-form">
          <input type="text" placeholder="Search"/>
          <button type="submit"></button>
        </form>
        <button className="icon-btn">
          <img src={bell} alt="Bell"/>
        </button>

        {/*<button className="upload">Upload</button>*/}
        {/*<button className="wallet">Connect Wallet</button>*/}
        {isAuthenticated && user ? (
            <div className="user-menu" onClick={() => setOpen(!open)}>
              <div className="main-menu">
              <img src={getImageUrl(user?.avatar) || "/default-avatar.png"} alt="avatar"
                   className="header-user-avatar"/>
              <span>{user?.display_name || user?.username}</span>
              <span className="arrow">{open ? "\u25B2" : "\u25BC"}</span>
            </div>

              {open && (
                <div className="dropdown">
                  <Link to={`/user/${user.id}`}>Profile</Link>
                  <Link to="/settings">Settings</Link>
                  <button onClick={logout} className="logout-button">Logout</button>
                </div>
                )}
            </div>
        ) : (
            <div className="login-or-register">
              <Link to="/login" className="login-link">Login</Link>
            <Link to="/register" className="register-link">Register</Link>
          </div>
        )}
      </div>
    </div>
  </header>;
}

export default Header;