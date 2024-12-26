/** @format */

import React from "react";

const AuthGuard = ({children}: {children: any}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  return children;
};

export default AuthGuard;
