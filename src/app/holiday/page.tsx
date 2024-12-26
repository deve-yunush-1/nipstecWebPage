/** @format */
"use client";
import {useEffect, useState} from "react";
import Navbar from "../Navbar";
import {DB_URL} from "@/modal/db_url";
import {Holiday} from "@/modal/Holiday";
import Loading from "@/components/component/loading";

export default function HolidayPage() {
  const [holiday, setHoliday] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    const formattedDate = formatDate(date);

    const response = await fetch(`${DB_URL()}/holiday`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        reason: holiday,
        description,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      setErr("Please check network connection or try again");
    }
    let {message, statusCode} = await response.json();

    console.log("Message ", message, statusCode);
    setLoading(false);
    setHoliday("");
    setReason("");
    setDescription("");
    setDate("");
  };

  const formatDate = (date: any) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="flex justify-center">
        <div className="min-w-full space-x-4 min-h-screen bg-gray-100 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-96">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Add a Holiday
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="holiday" className="block text-gray-700">
                  Holiday Name
                </label>
                <input
                  type="text"
                  id="holiday"
                  name="holiday"
                  value={holiday}
                  onChange={(e) => setHoliday(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700">
                  Holiday Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {!loading ? (
                  "Add Holiday"
                ) : (
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                )}
              </button>
            </form>
          </div>
          <div className="min-h-screen bg-white p-10 rounded-lg shadow-md w-1/2">
            <HolidayList />
          </div>
        </div>
      </div>
    </>
  );
}

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch holidays from the server
  useEffect(() => {
    const fetchHolidays = async () => {
      setLoading(true);
      try {
        // Replace this URL with your actual server API endpoint
        const response = await (await fetch(`${DB_URL()}/holiday`)).json();

        setHolidays(response); // Set the holidays from server response
        setLoading(false);
      } catch (err) {
        setError("Failed to load holidays");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-auto flex justify-center ">
      <div className="  w-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Holiday List
        </h2>
        {holidays.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4 text-left">Holiday</th>
                <th className="border-b py-2 px-4 text-left">Date</th>
                <th className="border-b py-2 px-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday: Holiday) => (
                <tr key={holiday.id}>
                  <td className="border-b py-2 px-4">{holiday.reason}</td>
                  <td className="border-b py-2 px-4">{holiday.holiday}</td>
                  <td className="border-b py-2 px-4">{holiday.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No holidays found.</p>
        )}
      </div>
    </div>
  );
};
