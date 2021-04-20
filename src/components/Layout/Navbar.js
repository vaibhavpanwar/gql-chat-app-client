import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";
import { useSelector, useDispatch } from "react-redux";
import { authConstants } from "../../redux/constants";
const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, user } = auth;
  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <div className="navbar-brand">
          <Link to="/">V-Chat</Link>
        </div>
        <div className="navbar-links">
          {isLoggedIn && Object.keys(user).length > 0 ? (
            <p
              className="logout-button"
              onClick={() => dispatch({ type: authConstants.USER_LOGOUT })}
            >
              Logout
            </p>
          ) : (
            <>
              {" "}
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
