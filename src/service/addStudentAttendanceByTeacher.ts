/** @format */

import {DB_URL} from "@/modal/db_url";

interface StudentAttendanceMark {
  user: StudentStatus[];
  courseId: string;
  startTime: string;
  endTime: string;
}

export type StudentStatus = {
  userId: number;
  isPresent: boolean;
};

export const addStudentAttendanceByTeacher = async ({
  user,
  courseId,
  startTime,
  endTime,
}: StudentAttendanceMark) => {
  try {
    let dataa = {
      user: user,
      courseId: courseId,
      startTime: startTime,
      endTime: endTime,
    };
    console.dir(dataa);
    const response = await fetch(`${DB_URL()}/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataa),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.dir(error);
  }
};
