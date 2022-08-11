import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout } from "../../store/slices/AuthSlice";
import { clearProfile } from "../../store/slices/ProfileSlice";
import { RootState } from "../../store/store";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { loading, isAuthenticated } = useAppSelector(
    (store: RootState) => store.auth.value
  );

  const authLinks = (
    <ul>
      <li>
        <Link to={"/profiles"}>Developers</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a
          onClick={() => {
            dispatch(clearProfile());
            dispatch(logout());
          }}
          href="#!"
        >
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to={"/profiles"}>Developers</Link>
      </li>
      <li>
        <Link to={"/register"}>Register</Link>
      </li>
      <li>
        <Link to={"/login"}>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to={"/"}>
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (isAuthenticated ? authLinks : guestLinks)}
    </nav>
  );
};

export default Navbar;
