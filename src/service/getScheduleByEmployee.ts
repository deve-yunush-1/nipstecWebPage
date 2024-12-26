/** @format */

import {DB_URL} from "@/modal/db_url";

export const getScheduleCurrentTimeAndDate = async () => {
  const response = await (
    await fetch(`${DB_URL()}/attendance/employee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
  ).json();

  return response;
};
