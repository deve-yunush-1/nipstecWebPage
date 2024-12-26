/** @format */

import {DB_URL} from "@/modal/db_url";

export const getEmployee = async () => {
  const user = await (
    await fetch(`${DB_URL()}/api/employee/token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).json();

  return user;
};
