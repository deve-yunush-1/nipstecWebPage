/** @format */

import {DB_URL} from "@/modal/db_url";

export const getScheduleCurrentTimeAndDate = async () => {
  console.log("Token: " + sessionStorage.getItem("token"));
  const response = await (
    await fetch(`${DB_URL()}/attendance/employee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
  ).json();

  console.log(response);

  return response;
};
