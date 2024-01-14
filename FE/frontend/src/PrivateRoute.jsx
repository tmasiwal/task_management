import React from "react";

import { Navigate, useLocation } from "react-router-dom";


import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  

  
  const isAuth = useSelector((store) => store.authReducer.isAuth);

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
