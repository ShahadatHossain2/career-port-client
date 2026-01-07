import React, { use } from "react";
import { AuthContext } from "../pages/context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const pathName = useLocation();
  if (loading) {
    return <span className="loading loading-spinner text-info"></span>;
  }
  if (!user) {
    return <Navigate state={pathName} to="/signIn"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
