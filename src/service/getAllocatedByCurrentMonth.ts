/** @format */

import {DB_URL} from "@/modal/db_url";

export const getAllocatedByCurrentMonth = async (length: number) => {
  const response = await (
    await fetch(
      `${DB_URL()}/employee/allocated/current-month?length=${length}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
  ).json();
  return response;
};
