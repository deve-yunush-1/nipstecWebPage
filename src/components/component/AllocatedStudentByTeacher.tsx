/** @format */

import React, {useState, useEffect} from "react";

interface Teacher {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
  grade: string;
}

export const TeacherStudentAllocation: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  // Fetch the list of teachers
  useEffect(() => {
    fetch("/api/teachers")
      .then((response) => response.json())
      .then((data: Teacher[]) => setTeachers(data))
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  // Fetch students when a teacher is selected
  const handleTeacherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teacherId = parseInt(event.target.value, 10);
    setSelectedTeacher(teacherId);

    if (teacherId) {
      fetch(`/api/teachers/${teacherId}/students`)
        .then((response) => response.json())
        .then((data: Student[]) => setStudents(data))
        .catch((error) => console.error("Error fetching students:", error));
    } else {
      setStudents([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Teacher-Student Allocation</h1>
      <div className="mb-4">
        <label
          htmlFor="teacherSelect"
          className="block text-gray-700 font-medium mb-2">
          Select Teacher:
        </label>
        <select
          id="teacherSelect"
          className="border border-gray-300 rounded p-2 w-full"
          value={selectedTeacher || ""}
          onChange={handleTeacherChange}>
          <option value="">-- Select a Teacher --</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Allocated Students:</h2>
        {students.length > 0 ? (
          <ul className="list-disc list-inside">
            {students.map((student) => (
              <li key={student.id}>
                {student.name} - Grade: {student.grade}
              </li>
            ))}
          </ul>
        ) : (
          <p>No students allocated.</p>
        )}
      </div>
    </div>
  );
};
