/** @format */

import {DB_URL} from "@/modal/db_url";
import {User} from "@/modal/User";

export const userDataById = async (userId: any) => {
  const res = await fetch(`${DB_URL()}/user/id/?userId=${userId}`);
  const users: User = await res.json();
  return users;
};
