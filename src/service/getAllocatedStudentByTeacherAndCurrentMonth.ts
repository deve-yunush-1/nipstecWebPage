/** @format */

import {DB_URL} from "@/modal/db_url";

export const getAllocatedByTeacherAndCurrentMonth = async (
  employeeId: string
) => {
  const response = await (
    await fetch(`${DB_URL()}/employee/${Number(employeeId)}/current-month`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return response;
};
