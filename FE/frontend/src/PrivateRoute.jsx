import React from "react";

import { Navigate, useLocation } from "react-router-dom";

import { getDataFormLocalStorage } from "./utils/localStorage";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  console.log(location);

  //Local Storage
  const isAuth = getDataFormLocalStorage("auth")?.isAuth || false;

  if (!isAuth) {
    return (
      <Navigate
        to={{ pathname: "/login", state: { from: location } }}
        replace={true}
      />
    );
  }

  return children;
};

export default PrivateRoute;
