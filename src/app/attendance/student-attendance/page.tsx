/** @format */
"use client";
import Navbar from "@/app/Navbar";
import CountdownTimer from "@/components/component/CountDownTimer";
import {LoginForm} from "@/components/component/LoggedInForm";
import {CapitalizeFirstLetter} from "@/components/ui/CapitaliseText";
import {AllocatedStudentToday} from "@/connetion/Allocation";
// import withAuth from "";
import {DB_URL} from "@/modal/db_url";
import {Schedule} from "@/modal/Schedule";
import React, {Suspense, useEffect, useState} from "react";
import {getScheduleCurrentTimeAndDate} from "@/service/getScheduleByEmployee";
import {
  addStudentAttendanceByTeacher,
  StudentStatus,
} from "@/service/addStudentAttendanceByTeacher";
import withAuth from "@/app/hoc/withAuth";

interface Allocation {
  id: string; // Unique identifier for each allocation
  studentName: string;
  course: string;
  courseId: any;
  time: string;
  day: string;
  duration: number;
  userId: any;
}

interface FormData {
  studentName: string;
  course: string;
  time: string;
  day: string;
  employee: string | null;
  employeeId: number;
  courseId: number;
}

const AllocatedStudents: React.FC = () => {
  // Sample data representing allocated students
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    course: "",
    time: "",
    day: "",
    employee: "",
    courseId: 0,
    employeeId: 0,
  });

  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [studentStatus, setStudentStatus] = useState<StudentStatus[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [userId, setUserId] = useState([]);
  const [time, setTime] = useState(600000);
  const [isVisible, setVisible] = useState(false);

  const [selectedAllocations, setSelectedAllocations] = useState<string[]>([]);

  // Handle checkbox selection
  const handleCheckboxChange = (allocation: Allocation) => {
    setSelectedAllocations((prev) =>
      prev.includes(allocation.id)
        ? prev.filter((selectedId) => selectedId !== allocation.id)
        : [...prev, allocation.id]
    );
    setStartTime(allocation.time);
    setUserId((prev) => ({
      ...prev,
      [allocation.id]: allocation.id,
    }));
    setStudentStatus(
      (prev: {userId: any; isPresent: boolean; courseId: any}[]) => {
        // Create a shallow copy of the previous state
        const updatedStatuses = [...prev];

        // Find the index of the student with the given userId
        const index = updatedStatuses.findIndex(
          (status) => status.userId === allocation.userId
        );

        if (index > -1) {
          // Update the existing status
          updatedStatuses[index] = {
            ...updatedStatuses[index], // Preserve other existing properties
            isPresent: true, // Update the presence status
            courseId: allocation.courseId, // Ensure courseId comes from allocation or another correct source
          };
        } else {
          // If the userId does not exist, add a new status
          updatedStatuses.push({
            userId: allocation.userId,
            isPresent: true,
            courseId: allocation.courseId,
          });
        }

        return updatedStatuses; // Return the updated state
      }
    );

    const currentTime = new Date();
    const currentTimeStatus =
      currentTime.getHours().toString().padStart(2, "0") +
      ":" +
      currentTime.getMinutes().toString().padStart(2, "0");
    setEndTime(currentTimeStatus);
    setTimeout(() => {
      console.log(studentStatus);
    }, 1000);
  };

  const markAttendance = () => {
    addStudentAttendanceByTeacher({
      user: studentStatus,
      endTime,
      startTime,
    }).then((value) => {
      console.log(value);
    });
  };

  useEffect(() => {
    // Update the state with the selected allocations

    setTimeout(() => {
      setVisible(false);
      sessionStorage.removeItem("token");
    }, time);

    if (sessionStorage.getItem("token") != null) {
      setVisible(true);
      handleScheduleStudent();
    }
  }, []);

  useEffect(() => {
    handleScheduleStudent();
  }, []);

  const handleScheduleStudent = async (): Promise<void> => {
    try {
      const value = await getScheduleCurrentTimeAndDate();

      // Prepare updated form data and student status
      const updatedFormData: {courseId?: any} = {};
      const updatedStudentStatus: {
        userId: any;
        isPresent: boolean;
        courseId: any;
      }[] = [];

      value.forEach((item: {user: {id: any}; product: {id: any}}) => {
        updatedFormData["courseId"] = item.product.id;
        updatedStudentStatus.push({
          userId: item.user.id,
          isPresent: false,
          courseId: item.product.id,
        });
      });

      // Update form data
      setFormData((prev) => ({
        ...prev,
        ...updatedFormData,
      }));

      // Update student status
      setStudentStatus((prev) => [...prev, ...updatedStudentStatus]);

      // Prepare allocation data
      const allocations: Allocation[] = value.map(
        (item: {
          id: number;
          user: {id: any; firstName: string; lastName: string};
          product: {id: any; title: string};
          time: string;
          dayOfWeek: string;
          duration: string;
        }) => ({
          id: item.id,
          studentName: `${item.user.firstName} ${item.user.lastName}`,
          course: item.product.title,
          courseId: item.product.id,
          time: item.time,
          day: item.dayOfWeek,
          duration: item.duration,
          userId: item.user.id,
        })
      );

      // Update allocations
      setAllocations(allocations);
    } catch (error) {
      console.error("Error scheduling students:", error);
    }
  };

  return (
    <>
      {isVisible ? (
        <div className="pt-[60px] ml-10 mr-10">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold mb-4">
              Allocated Teacher: {formData.employee}
            </h1>
            <div className="mb-3 flex gap-2 justify-between">
              <CountdownTimer
                initialMinutes={time / (1000 * 60)}
                initialSeconds={0}
                onComplete={undefined}
              />
            </div>
            <button
              onClick={markAttendance}
              className="text-xl text-white  bg-green-500 hover:bg-green-600 py-2 px-2 rounded-md font-bold mb-4">
              Mark Attendance
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 border border-gray-300 p-4">
            {/* Header */}
            <div className="font-bold bg-gray-100 p-2 border-b border-gray-300">
              Select
            </div>
            <div className="font-bold bg-gray-100 p-2 border-b border-gray-300">
              Student Name
            </div>
            <div className="font-bold bg-gray-100 p-2 border-b border-gray-300">
              Course
            </div>
            <div className="font-bold bg-gray-100 p-2 border-b border-gray-300">
              Time
            </div>
            <div className="font-bold bg-gray-100 p-2 border-b border-gray-300">
              Day
            </div>

            {/* Body */}
            {allocations.map((allocation) => (
              <>
                <div className="p-2 border-t border-gray-300 flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedAllocations.includes(allocation.id)}
                    onChange={() => handleCheckboxChange(allocation)}
                  />
                </div>
                <div className="p-2 border-t border-gray-300">
                  <CapitalizeFirstLetter text={allocation.studentName} />
                </div>
                <div className="p-2 border-t border-gray-300">
                  {allocation.course}
                </div>
                <div className="p-2 border-t border-gray-300">
                  {allocation.time}
                </div>
                <div className="p-2 border-t border-gray-300">
                  {allocation.day}
                </div>
              </>
            ))}
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Attendent Students:</h2>
            <ul className="list-disc ml-5">
              {selectedAllocations.map((id) => {
                const student = allocations.find(
                  (allocation) => allocation.id === id
                );
                return (
                  <li key={id}>
                    <CapitalizeFirstLetter text={student!.studentName} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div>You are not authenticated, Please Try again</div>
      )}
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <AllocatedStudents />
    </Suspense>
  );
}

// export default withAuth(Page, ["Teacher"]);
