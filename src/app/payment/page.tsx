/** @format */

"use client";

import React, {Suspense, useEffect, useState} from "react";
import Navbar from "../Navbar";
import {DB_URL} from "@/modal/db_url";
import {useSearchParams} from "next/navigation";
import {PaymentHistory} from "@/components/component/PaymentHistory";
import Loading from "@/components/component/loading";
import {SuccessModal} from "@/components/component/SuccessModal";
import {ModeOfPayment} from "@/modal/transactionOptions";
import {DbEnrollment} from "@/modal/Installment";

function PaymentComponent() {
  const [formData, setFormData] = useState({
    query: "",
    modeOfPayment: "",
    userId: "",
    amount: "",
    course: "",
    transactionMethod: "",
    receivedFrom: "",
    transactionParticular: "",
    receiptNumber: "",
    date: new Date().toISOString().slice(0, 10), // Default to today's date
  });
  const [loadingSearching, setLoadingSearching] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingStudentData, setLoadingStudentData] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [enrollment, setEnrollment] = useState(null);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [amount, setAmount] = useState(0);
  const [transParticular, setTransParticular] = useState("");
  const [methodOfPayment, setMethodOfPayment] = useState("");
  const [registerationNumber, setRegisterationNumber] = useState("");

  const searchParams = useSearchParams();
  const dataId = searchParams?.get("studentid");
  const [enrolledCourse, setEnrolledCourse] = useState([]);

  const modeOptions = [
    {value: "bank", label: "BANK"},
    {value: "card", label: "CARD"},
    {value: "cash", label: "CASH"},
  ];

  const transactionMethodOptions = {
    bank: [
      {value: "upi", label: "UPI"},
      {value: "cheque", label: "CHEQUE"},
      {value: "neft", label: "NEFT"},
    ],
    card: [
      {value: "credit", label: "CREDIT"},
      {value: "debit", label: "DEBIT"},
    ],
    cash: [{value: "cash", label: "CASH"}],
  };

  useEffect(() => {
    if (!dataId) return;
    var courseOptions: [];
    async function fetchData() {
      setLoadingStudentData(true);

      try {
        const student = await fetchStudentData(dataId!);
        formData.receivedFrom =
          student[0].user.firstName + " " + student[0].user.lastName || "";
        courseOptions = student.map((item: DbEnrollment, index: number) => ({
          value: item.id, // Assuming each item has an ID
          label: item.product.title,
        }));

        setEnrolledCourse(courseOptions); // Set multiple course options
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoadingStudentData(false);
      }
    }

    fetchData();
  }, [dataId]);

  const handleInputChange = (e: any) => {
    const {id, value} = e.target;
    setFormData((prev) => ({...prev, [id]: value}));
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!formData.query.trim()) {
      alert("Please enter the search query.");
      return;
    }

    setLoadingSearching(true);
    try {
      const res = await fetch(
        `${DB_URL()}/user/search?query=${encodeURIComponent(formData.query)}`
      );
      const data = await res.json();
    } catch (error) {
      console.error("Error searching data:", error);
    } finally {
      setLoadingSearching(false);
    }
  };

  const installmentDetails = {
    modeOfPayment,
    methodOfPayment,
    transParticular,
    paidAmount: amount,
  };

  const handleFormSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault();

    setLoadingSubmit(true);
    try {
      const res = await fetch(
        `${DB_URL()}/payment/installment?enrollmentId=${enrollment}`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(installmentDetails),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit the form.");
      }

      const result = await res.json();
      setMessage("Payment details submitted successfully!");
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(true);
      setMessage("Installment amount exceeds balance fee");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCloseButton = () => {
    setIsSuccess(false);
  };

  const fetchPaymentHistory = (e: any) => {
    setLoadingSearching(true);
    setEnrollment(e);
  };
  const mode: ModeOfPayment = (modeOfPayment || "bank") as ModeOfPayment;

  const transactionMethodList = transactionMethodOptions[mode] || [];

  if (loadingStudentData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-20">
        <div className="text-xl font-bold text-blue-600">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <>
      <SuccessModal
        isOpen={isSuccess}
        onClose={handleCloseButton}
        message={message}
        title={`Payment Alert`}
      />
      <Navbar />
      <div className="flex mt-[100px] justify-center items-center min-w-screen">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <form className="mb-6" onSubmit={handleSearch}>
            <label
              htmlFor="query"
              className="block text-lg font-medium text-gray-700">
              Search Here
            </label>
            <div className="flex gap-2 mt-2">
              <input
                id="query"
                type="search"
                value={formData.query}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by enquiry/registration number"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                {loadingSearching ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          <div className="flex justify-between">
            <div className="font-bold text-2xl mb-2 text-blue-500">
              Payment History :- {formData.receivedFrom}
            </div>
            <SelectField
              id="course"
              label="Enrolled Courses"
              value={formData.course}
              options={enrolledCourse}
              onChange={(e: {target: {value: any}}) => {
                setFormData((prev) => ({
                  ...prev,
                  course: e.target.value,
                }));
                fetchPaymentHistory(e.target.value); // Fetch history when course is selected
              }}
            />
          </div>

          {enrollment ? (
            <PaymentHistory enrollmentId={enrollment} />
          ) : (
            <div>No enrollment data found for this student.</div>
          )}

          <h2 className="text-xl mt-2 font-bold text-blue-600 mb-4">
            Issue New Receipt
          </h2>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                id="amount"
                label="Amount Received"
                type="number"
                value={amount}
                onChange={(e: {target: {value: any}}) =>
                  setAmount(Number(e.target.value))
                }
              />
              <InputField
                id="transactionParticular"
                label="Transaction Particular"
                type="text"
                value={transParticular}
                onChange={(e: {
                  target: {value: React.SetStateAction<string>};
                }) => setTransParticular(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SelectField
                id="modeOfPayment"
                label="Mode of Payment"
                value={modeOfPayment}
                options={modeOptions}
                onChange={(e: {
                  target: {value: React.SetStateAction<string>};
                }) => setModeOfPayment(e.target.value)}
              />
              <SelectField
                id="transactionMethod"
                label="Transaction Method"
                value={methodOfPayment}
                options={transactionMethodList}
                onChange={(e: {
                  target: {value: React.SetStateAction<string>};
                }) => setMethodOfPayment(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700">
              {loadingSubmit ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// Reusable Input Field Component
function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
}: {
  id: any;
  label: any;
  type: any;
  value: any;
  onChange: any;
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
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// Reusable Select Field Component
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
        {options.map((opt: {value: any; label: any}) => (
          <option key={`${opt.value}`} value={`${opt.value}`}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Fetch Student Data
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

export default function Page() {
  return (
    <Suspense>
      <PaymentComponent />
    </Suspense>
  );
}
