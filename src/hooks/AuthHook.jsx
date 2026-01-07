import React, { use } from "react";
import { AuthContext } from "../pages/context/AuthContext";

const AuthHook = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default AuthHook;
