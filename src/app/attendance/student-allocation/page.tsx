/** @format */

"use client";

import Navbar from "@/app/Navbar";
import {RescheduleCheckbox} from "@/components/component/RescheduleCheckbox";
import {CapitalizeFirstLetter} from "@/components/ui/CapitaliseText";
import {DB_URL} from "@/modal/db_url";
import {DbEnrollment} from "@/modal/Installment";
import {EstimateTime} from "@/modal/Session";
import {getEmployeeByTeacher} from "@/service/getEmployeeByTeacher";
import {useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
interface Allocations {
  [key: string]: string; // Keys are strings, and values are strings
}

interface FormData {
  course: string | null;
  duration: number;
  courseId: string | null;
  userId: string | null;
  day: string[] | null;
  time: string | null;
  name: string | null;
  date: string | null;
  employeeId: string | null;
  employee: string | null;
}

const AllocateStudent = () => {
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    course: "",
    courseId: "",
    employeeId: "",
    employee: "",
    day: [],
    time: "",
    duration: 0, // Course duration dynamically set
    name: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [allocations, setAllocations] = useState<Allocations>({});
  const [teacher, setTeacher] = useState<string | null>("");
  const [selectedTime, setSelectedTime] = useState("");
  const [schedule, setSchedule] = useState<EstimateTime[]>([]);
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [hour, setHour] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const dataId = searchParams?.get("studentid");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!dataId) return;

    async function fetchData() {
      try {
        const student = await fetchStudentData(dataId!);

        student.map((item: DbEnrollment) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            userId: item.user.id,
          }));
        });
        const courseOptions = student.map((item: DbEnrollment) => ({
          value: item.product.duration,
          label: item.product.title,
          course: item.product.title,
          courseId: item.product.id,
        }));

        setEnrolledCourse(courseOptions);
        setFormData((prev) => ({
          ...prev,
          name: student[0]?.user?.firstName + " " + student[0]?.user?.lastName,
        }));
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
      }

      getEmployeeByTeacher().then((value) => {
        const teacherOption = value.map((item: any) => ({
          value: item.id,
          label: item.firstname + " " + item.lastname,
        }));

        setEmployees(teacherOption);
      });
    }

    fetchData();
  }, [dataId]);

  const handleAllocate = () => {
    if (selectedDays.length > 0 && selectedTime) {
      // Create a copy of the current allocations
      const newAllocations = {...allocations};

      // Map through selectedDays and allocate the selected time
      selectedDays.forEach((day) => {
        newAllocations[day] = selectedTime;
      });

      // Update the state with the new allocations
      setAllocations(newAllocations);
    }
  };

  const handleShowCalendar = () => {
    handleGenerateSchedule();
    // setEndDate(schedule[schedule.length - 1].date);
  };

  const handleGenerateSchedule = () => {
    if (Object.keys(allocations).length === 0) {
      setSchedule([]);
      return;
    }

    const selectedDays = Object.keys(allocations);
    const generatedSchedule = generateClassSchedule(
      formData.duration,
      hour,
      startDate,
      selectedDays
    );
    setSchedule(generatedSchedule);
    setEndDate(schedule[schedule.length - 1].date);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = e.target.selectedOptions[0];

    const productId = selectedCourse?.getAttribute("data-product-id");
    const duration = selectedCourse?.value;

    setFormData((prev) => ({
      ...prev,
      course: e.target.value,
      duration: Number(duration),
      courseId: productId,
    }));
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      employee: e.target.value || "",
      employeeId: e.target.value,
    }));
  };

  const handleRemoveAllocation = (day: any) => {
    const newAllocations = {...allocations};
    delete newAllocations[day];
    delete allocations[day];
    setAllocations(newAllocations);
    setEndDate(schedule[schedule.length - 1].date);
    handleGenerateSchedule();
  };

  const handleDaySelection = (day: string, isChecked: boolean) => {
    setSelectedDays((prevDays) =>
      isChecked ? [...prevDays, day] : prevDays.filter((d) => d !== day)
    );
  };

  const handleConfirmAllocation = async () => {
    setIsLoading(true);
    const response = await allocateStudentTime(
      formData.userId,
      formData.courseId,
      Object.keys(allocations),
      selectedTime,
      startDate,
      endDate,
      hour,
      formData.employeeId
    );
    console.log(response);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="flex mt-[100px] justify-center">
        <div className="mx-auto max-h-screen overflow-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between font-bold text-2xl mb-2 text-blue-500">
            <span>Allocate Time:</span>
            <CapitalizeFirstLetter text={formData.name} />
          </div>

          <RescheduleCheckbox
            onReschedule={function (): void {}}
            onTeacherReschedule={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

          <div className="flex justify-between mb-4">
            <SelectField
              id="course"
              label="Enrolled Courses"
              value={formData.course}
              options={enrolledCourse}
              onChange={handleCourseChange}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <SelectField
              id="course"
              label="Choose Teacher"
              value={formData.employee}
              options={employees}
              onChange={handleEmployeeChange}
            />
          </div>

          <div className="space-y-4">
            <div className=" items-center">
              <div className="flex justify-between items-center">
                <label className="w-1/4 text-lg">Select Days</label>
                <div className="w-2/3 grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="checkbox-select-all"
                      checked={selectedDays.length === daysOfWeek.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDays([...daysOfWeek]); // Select all days
                        } else {
                          setSelectedDays([]); // Deselect all days
                        }
                      }}
                      className="w-5 h-5 accent-blue-500"
                    />
                    <label htmlFor="checkbox-select-all" className="text-lg">
                      Select All
                    </label>
                  </div>

                  {daysOfWeek.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`checkbox-${day}`}
                        value={day}
                        checked={selectedDays.includes(day)}
                        onChange={(e) =>
                          handleDaySelection(day, e.target.checked)
                        }
                        className="w-5 h-5 accent-blue-500"
                      />
                      <label htmlFor={`checkbox-${day}`} className="text-lg">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <InputField
                type="date"
                onChange={(e: {target: {value: any}}) =>
                  setStartDate(e.target.value)
                }
                id={startDate}
                label={"Class Start Date"}
                value={startDate}
                className={``}
              />

              <InputField
                type="number"
                onChange={(e: {target: {value: any}}) =>
                  setHour(Number(e.target.value))
                }
                id={hour}
                label={"Class Duration"}
                value={hour}
                className={``}
              />
              <InputField
                id={selectedTime}
                type="time"
                label={"Choose Time"}
                value={selectedTime}
                onChange={(e: {target: {value: any}}) =>
                  setSelectedTime(e.target.value)
                }
                className={``}
              />
            </div>

            <div className="flex justify-between space-x-2">
              <button
                onClick={handleAllocate}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Allocate Time
              </button>
              <button
                onClick={handleShowCalendar}
                className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Estimated Schedule
              </button>
            </div>
            <div className="justify-between items-center">
              <InputField
                type={"date"}
                onChange={(e: {target: {value: any}}) =>
                  setEndDate(e.target.value)
                }
                className={`bg-gray-400`}
                id={""}
                label={"End Date"}
                value={endDate}
              />
            </div>
            <button
              onClick={handleConfirmAllocation}
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              {!isLoading ? "Confirm" : "Confirming..."}
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Allocated Times</h2>
            <ul className="space-y-2">
              {Object.entries(allocations).map(([day, time]) => (
                <li
                  key={day}
                  className="flex justify-between items-center border-b pb-2">
                  <span>
                    {day}: {time}
                  </span>
                  <button
                    onClick={() => handleRemoveAllocation(day)}
                    className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="min-w-5xl mx-auto max-h-screen overflow-auto p-6 bg-white rounded-lg ">
          {allocations !== null
            ? schedule.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-medium">
                    Your Estimated Schedule:- {schedule.length + " Days"}
                  </h2>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {schedule.map((item: EstimateTime, index) => (
                      <div
                        key={item.date}
                        className="p-4 bg-gray-100 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">{item.date}</p>
                        <p className="text-lg">Day: {item.day}</p>
                        <p>Start Time: {item.startTime}</p>
                        <p>End Time: {item.endTime}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            : ""}
        </div>
      </div>
    </>
  );
};

const allocateStudentTime = async (
  userId: string | null,
  productId: string | null,
  dayOfWeek: string[],
  time: string,
  startDate: string,
  endDate: string,
  duration: number,
  employeeId: string | null
) => {
  let date = {
    userId,
    productId,
    dayOfWeek,
    time,
    startDate,
    endDate,
    duration,
    employeeId,
  };

  const response = await fetch(`${DB_URL()}/attendance/allocation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(date),
  });
  const data = await response.json();
  location.reload();
  return data;
};

export function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  className,
}: {
  id: any;
  label: any;
  type: any;
  value: any;
  onChange: any;
  className: any;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
}
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

function generateClassSchedule(
  courseDuration: number,
  classDuration: number,
  startDate: string,
  selectedDays: string[]
) {
  // Total hours completed
  let totalHours = 0;

  // Class schedule array
  const schedule = [];

  // Parse the start date
  let currentDate = new Date(startDate);

  // Function to get the day name from a date
  const getDayName = (date: Date) =>
    date.toLocaleDateString("en-US", {weekday: "long"});
  const convertToDate = (dateString: string): string => {
    // Split the string into parts (dd/MM/yyyy)
    const [day, month, year] = dateString.split("/").map(Number);

    // Format to yyyy-MM-dd ensuring two-digit day and month
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  };
  // Loop until we meet the course duration
  while (totalHours < courseDuration) {
    // Check if the current day is one of the selected days

    if (selectedDays.includes(getDayName(currentDate))) {
      const endDate = new Date(currentDate);
      endDate.setHours(currentDate.getHours() + classDuration);

      // Add the class session to the schedule
      schedule.push({
        date: convertToDate(currentDate.toLocaleDateString()).toString(),
        day: getDayName(currentDate),
        startTime: currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: endDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      // Increment total hours
      totalHours += classDuration;
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
}

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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllocateStudent />
    </Suspense>
  );
}
