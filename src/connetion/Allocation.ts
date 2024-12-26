/** @format */

import {DB_URL} from "@/modal/db_url";

export const allocation = async (
  userId: string,
  productId: string,
  dayOfWeek: string[],
  time: string,
  startDate: string,
  endDate: string,
  duration: number
) => {
  const {data} = await (
    await fetch(`${DB_URL()}/attendance/allocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        dayOfWeek,
        time,
        startDate,
        endDate,
        duration,
      }),
    })
  ).json();
  return data;
};

export const AllocatedStudentToday = async () => {
  const data = await (
    await fetch(`${DB_URL()}/attendance/today`, {
      method: "GET",
    })
  ).json();
  return data;
};
