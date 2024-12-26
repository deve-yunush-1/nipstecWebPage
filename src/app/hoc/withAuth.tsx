/** @format */

import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {AuthContext} from "../context/AuthContext";

const withAuth = (
  Component: React.ComponentType,
  allowedUserTypes: string[]
) => {
  return (props: any) => {
    const {user} = useContext(AuthContext) || {};
    const router = useRouter();

    useEffect(() => {
      if (!user || !allowedUserTypes.includes(user.userType)) {
        router.push("/login");
      }
    }, [user, allowedUserTypes, router]);

    return user ? <Component {...props} /> : null;
  };
};

export default withAuth;
