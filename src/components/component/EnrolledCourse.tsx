/** @format */

import {DB_URL} from "@/modal/db_url";
import {useEffect} from "react";

export const EnrolledCourse = ({studentId}: {studentId: string}) => {
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const response = await fetchStudentData(studentId);
    };
    fetchEnrolledCourses();
  }, []);
};

async function fetchStudentData(studentId: string) {
  try {
    const res = await fetch(
      `${DB_URL()}/user/purchase/userid?userId=${studentId}`
    );
    if (!res.ok) throw new Error("Failed to fetch student data.");
    return await res.json();
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
}
