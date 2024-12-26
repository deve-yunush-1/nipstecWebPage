/** @format */

import {DB_URL} from "@/modal/db_url";

export const getEmployeeByTeacher = async () => {
  const response = await (
    await fetch(`${DB_URL()}/employee/role?r=teacher`)
  ).json();
  console.dir("Employee", response);
  return response;
};
