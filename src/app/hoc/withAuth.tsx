/** @format */

// /** @format */

// import {useContext, useEffect} from "react";
// import {useRouter} from "next/router";
// import {AuthContext} from "../context/AuthContext";

// const withAuth = (
//   Component: React.ComponentType,
//   allowedUserTypes: string[]
// ) => {
//   return (props: any) => {
//     const {user} = useContext(AuthContext) || {};
//     const router = useRouter();

//     useEffect(() => {
//       if (typeof window !== "undefined") {
//         if (!user || !allowedUserTypes.includes(user.userType)) {
//           router.push("/login");
//         }
//       }
//     }, [user, allowedUserTypes, router]);

//     return user ? <Component {...props} /> : null;
//   };
// };

// export default withAuth;

import React, {useState} from "react";
import {useRouter} from "next/router";
import {AuthContext} from "../context/AuthContext";

const withAuth = (
  Component: React.ComponentType,
  allowedUserTypes: string[]
) => {
  return (props: any) => {
    const {user} = React.useContext(AuthContext) || {};
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    React.useEffect(() => {
      // This ensures code runs only on the client
      if (typeof window === "undefined") return;

      setIsClient(true);

      if (user && allowedUserTypes.includes(user.userType)) {
        setIsAuthorized(true);
      } else {
        router.push("/"); // Redirect to login if not authorized
      }
    }, [user, allowedUserTypes, router]);

    // Show fallback during server-side rendering or while checking auth
    if (!isClient || !isAuthorized) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
