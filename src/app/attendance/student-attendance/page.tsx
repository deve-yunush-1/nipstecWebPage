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
import {addStudentAttendanceByTeacher} from "@/service/addStudentAttendanceByTeacher";

interface Allocation {
  id: string; // Unique identifier for each allocation
  studentName: string;
  course: string;
  time: string;
  day: string;
  duration: number;
  userId: string;
  courseId: number;
}

interface FormData {
  studentName: string;
  course: string;
  time: string;
  day: string;
  employee: string | null;
  employeeId: number;
  courseId: "";
}
interface StudentStatus {
  [userId: number]: {
    userId: number;
    isPresent: boolean;
    courseId: number;
  };
}

const AllocatedStudents: React.FC = () => {
  // Sample data representing allocated students
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    course: "",
    time: "",
    day: "",
    employee: "",
    courseId: "",
    employeeId: 0,
  });

  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [studentStatus, setStudentStatus] = useState<StudentStatus>({});
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
    setStudentStatus((prev) => {
      // Ensure all students are initialized as absent
      const updatedStatuses = {...prev};

      // Update the current student's status to present
      studentStatus[allocation.id] = {
        userId: allocation.userId,
        isPresent: true,
        courseId: allocation.courseId,
      };
      console.log(updatedStatuses);

      return updatedStatuses;
    });

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
      courseId: formData.courseId,
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
      localStorage.removeItem("token");
    }, time);

    if (localStorage.getItem("token")! != null) {
      setVisible(true);
      handleScheduleStudent();
    }
  }, []);

  const handleLogin = (userData: any) => {
    setFormData((prev) => ({
      ...prev,
      employeeId: userData.employeeId,
      employee:
        userData.object.firstname + " " + userData.object.lastname || "",
    }));
    // You can save the token in localStorage or perform other actions
    localStorage.setItem("token", userData.token);
    setVisible(true);
    handleScheduleStudent();
  };

  const handleScheduleStudent = () => {
    getScheduleCurrentTimeAndDate().then((value) => {
      value.map((item: {user: {id: any}; product: {id: any}}) => {
        setFormData((prev) => ({
          ...prev,
          courseId: item.product.id,
        }));
        setStudentStatus((prev) => [
          {userId: item.user.id, isPresent: false}, // Add `isPresent: true` for each student
        ]);
      });
      let allocation: Allocation[] = value.map(
        (
          item: {
            id: number;
            user: {id: any; firstName: string; lastName: string};
            product: {title: any};
            time: any;
            dayOfWeek: any;
            duration: any;
          },
          index: any
        ) => {
          return {
            id: item.id,
            studentName: item.user.firstName + " " + item.user.lastName,
            course: item.product.title,
            time: item.time,
            day: item.dayOfWeek,
            duration: item.duration,
            userId: item.user.id,
          };
        }
      );
      setAllocations(allocation);
    });
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      {isVisible ? (
        <div className="mx-auto max-h-screen mt-[120px] ml-10 mr-10">
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
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Select</th>
                <th className="border border-gray-300 px-4 py-2">
                  Student Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Course</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Day</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((allocation) => (
                <tr key={allocation.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedAllocations.includes(allocation.id)}
                      onChange={() => handleCheckboxChange(allocation)}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <CapitalizeFirstLetter text={allocation.studentName} />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {allocation.course}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {allocation.time}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {allocation.day}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <LoginForm onLogin={handleLogin} />
      )}
    </>
  );
};

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: any;
  label: any;
  options: any;
  value: any;
  onChange: any;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt: {value: any; label: any; courseId: string}) => (
          <option
            key={`${opt.value}`}
            data-product-id={opt.courseId}
            value={`${opt.value}`}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const duration = (time: string) => {
  const currentDate = new Date();

  // Step 2: Split the allocation time (e.g., '10:00') into hours and minutes
  const [hours, minutes] = time.split(":");

  // Step 3: Create the start time (use the current date for the day, but set the specific time)
  const startTime = new Date();
  startTime.setHours(Number(hours), Number(minutes), 0, 0); // Set the hours, minutes, and reset seconds/milliseconds

  // Step 4: Calculate the duration between current time and start time in milliseconds
  const durationInMilliseconds: number = +currentDate - +startTime; // Using '+' to force conversion to number

  // Step 5: Convert milliseconds to more readable format (e.g., hours, minutes)
  const durationInMinutes: number = Math.floor(
    durationInMilliseconds / (1000 * 60)
  ); // Duration in minutes
  const durationInHours: number = Math.floor(durationInMinutes / 60); // Duration in hours
  const remainingMinutes: number = durationInMinutes % 60; // Remaining minutes

  return durationInHours;
};

const getEmployee = async () => {
  const response = (await fetch(`${DB_URL()}/employee/role?r=teacher`)).json();
  return response;
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <AllocatedStudents />
    </Suspense>
  );
}

// export default withAuth(Page, ["Teacher"]);
