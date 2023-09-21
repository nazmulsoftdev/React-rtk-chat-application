import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
function PrivateRoute({ children }) {
  // check if user is loggedin or not (if user is loggedIn then redirect to conversation page)

  const isLoggedIn = useAuth();

  return isLoggedIn ? children : <Navigate to="/" replace={true} />;
}

export default PrivateRoute;
