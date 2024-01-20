import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
function PublicRoute({ children }) {
  // check if user is not loggedin  (if user is not loggedIn then user can access few pages)

  const isLoggedIn = useAuth();

  return !isLoggedIn ? children : <Navigate to="/conversation" />;
}

export default PublicRoute;
