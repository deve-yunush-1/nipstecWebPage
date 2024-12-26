/** @format */

import {DB_URL} from "@/modal/db_url";

export const addRescheduleToOldTeacherToNewTeacher = async ({
  oldEmp,
  newEmp,
}: any) => {
  const response = await await fetch(
    `${DB_URL()}/attendance/reschedule/all?old=${oldEmp}&new=${newEmp}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        allUserId: [3, 79],
        startDate: "2024-12-21",
        endDate: "2024-12-30",
      }),
    }
  );
};
