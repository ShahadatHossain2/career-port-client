import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import logo from "../../assets/logo-removebg-preview.png";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const Header = () => {
  const { user, userSignOut } = use(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    userSignOut()
      .then((result) => {
        toast("Logged out!!");
        navigate("/signIn");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
  const link = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/application">Applied Job</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <img className="w-15" src={logo} alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      <div className="navbar-end">
        {!user && (
          <NavLink className="btn btn-sm bg-black text-white" to="/register">
            Register
          </NavLink>
        )}
        {user ? (
          <NavLink
            onClick={handleSignOut}
            className="btn btn-sm bg-blue-400 text-white"
          >
            SignOut
          </NavLink>
        ) : (
          <NavLink to="/signIn" className="btn btn-sm bg-blue-400 text-white">
            SignIn
          </NavLink>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
