/** @format */

import React, {createContext, useState, useEffect, ReactNode} from "react";
import {verifyToken} from "../../utils/auth";
import {getEmployee} from "../../service/userService";

interface AuthContextType {
  user: any;
  token: string | null;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  token: null,
  setToken: function (token: string): void {
    throw new Error("Function not implemented.");
  },
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Token", storedToken);
    if (storedToken) {
      const decoded = verifyToken(storedToken);
      if (decoded) {
        getEmployee()
          .then((data) => setUser(data))
          .catch((error) => console.error("Error fetching employee:", error));
      } else {
        console.log("Employee not found");
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{user, token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};
