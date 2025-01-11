/** @format */
"client side";
import React, {useState} from "react";
import Link from "next/link";
import ApproveModal from "./Approvel";
import {User} from "@/modal/User";
import SearchBar from "./SearchBarComponet";
import {CapitalizeFirstLetter} from "../ui/CapitaliseText";
import {DB_URL} from "@/modal/db_url";
import {InputField} from "../ui/InputField";

export const UserTable = ({users, title}: {users: User[]; title: string}) => {
  const [filteredProducts, setFilteredProducts] = useState<User[]>(users);
  const updateFilteredProducts = (filteredItems: User[]) => {
    setFilteredProducts(filteredItems);
  };
  const filterProductsByTitle = (users: User[], searchTerm: string): User[] => {
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  return (
    <section className="mb-6">
      <div className="flex justify-between">
        <h2
          className={`text-lg font-bold m-4 ${getStatusClass(
            title.toUpperCase()
          )}`}>
          {getStatusText(title.toUpperCase())} {" \t\t "} Records:-{" "}
          {users.length}
        </h2>
      </div>

      <div className="m-4">
        <SearchBar
          items={users}
          filterFunction={filterProductsByTitle}
          onFilterChange={updateFilteredProducts}
          placeholder="Search for courses..."
        />
      </div>

      <div className="overflow-x-auto h-80">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">
                {title === "enquiry"
                  ? "Registration Date"
                  : title === "incomplete"
                  ? "Updation Date"
                  : title === "complete"
                  ? "Approved Date"
                  : ""}
              </th>
              {/* <th className="px-4 py-2">Status</th> */}
              <th className="px-4 py-2">Actions</th>
              <th className="px-4 py-2"> </th>
              <th className="px-4 py-2"> </th>
              <th className="px-4 py-2"> Class</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0
              ? filteredProducts.map((user: User) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">
                      <CapitalizeFirstLetter
                        text={user.firstName + " " + user.lastName}
                      />
                    </td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2">
                      {formatDate(
                        title === "complete"
                          ? user.approvedAt
                          : title === "incomplete"
                          ? user.updatedAt
                          : title === "enquiry"
                          ? user.createdAt
                          : ""
                      )}
                    </td>
                    {/* <td className={`px-4 py-2 ${getStatusClass(user.status)}`}>
                      {getStatusText(user.status)}
                    </td> */}
                    <td className="px-4 py-2 space-x-2">
                      <a
                        href={`/students/profile/${user.id}`}
                        className="px-4 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600">
                        View
                      </a>
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      {user.status === "INCOMPLETE" && (
                        // <Link
                        //   href={`https://spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net/api/user/update/status?userId=${user.id}`}
                        //   className="px-4 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600">
                        //   Approve
                        // </Link>
                        <ApproveModal studentId={user.id} />
                      )}
                    </td>
                    {user.status.toLocaleLowerCase() !== "enquiry" ? (
                      <td>
                        <Link href={`/payment?studentid=${user.id}`}>
                          <button className="px-3 py-1 gap-2 bg-green-500 rounded-md hover:bg-green:600 text-white">
                            Payment
                          </button>
                        </Link>
                      </td>
                    ) : (
                      ""
                    )}
                    {user.status.toLocaleLowerCase() === "complete" ? (
                      <td>
                        <Link
                          href={`/dashboard/student-allocation?studentid=${user.id}`}>
                          <button className="px-3 py-1 gap-2 bg-blue-500 rounded-md hover:bg-blue:600 text-white">
                            Allocate
                          </button>
                        </Link>
                      </td>
                    ) : (
                      ""
                    )}
                    {user.status.toLocaleLowerCase() === "enquiry" ||
                    user.status.toLocaleLowerCase() === "complete" ? (
                      <td>
                        <GenerateDiscountOfferForStudent userId={user.id} />
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </section>
  );
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function getStatusClass(status: string) {
  switch (status) {
    case "COMPLETE":
      return "text-green-600 font-semibold";
    case "INCOMPLETE":
      return "text-yellow-600 font-semibold";
    case "ENQUIRY":
      return "text-red-600 font-semibold";
    default:
      return "";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "COMPLETE":
      return "Registered";
    case "INCOMPLETE":
      return "Submitted";
    case "ENQUIRY":
      return "Enquiry";
    default:
      return "Unknown";
  }
}

interface DiscountOffer {
  key: string;
  percentage: number;
  expireDate: string;
  userId: string;
}

const GenerateDiscountOffer = ({
  isOpen,
  closeModal,
  onGenerateDiscount,
  userId,
}: {
  isOpen: boolean;
  closeModal: any;
  onGenerateDiscount: any;
  userId: any;
}) => {
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);
  const [discountOffers, setDiscountOffers] = useState<DiscountOffer | null>(
    null
  );

  const [expireDate, setExpireDate] = useState(new Date().toLocaleDateString());

  const discountOptions = [5, 10, 15, 20, 25]; // Discount percentages

  // Generate Discount Offer
  const generateDiscountOffer = () => {
    if (selectedDiscount === 0) {
      alert("Please select a discount percentage.");
      return;
    }
    const generateRandomString = (length: number): string => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    // Generate a random discount code
    if (typeof window == "undefined") return;
    const randomCode = `${generateRandomString(7)}${Math.floor(
      Math.random() * 10000
    )}`;

    // Set the generated discount offer for the student
    const offer = {
      key: randomCode,
      percentage: selectedDiscount,
      expireDate: expireDate,
      userId: userId,
    };
    // /api/discount

    const saveGeneratedDiscount = async () => {
      const response = await fetch(`${DB_URL()}/discount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offer),
      });
      if (response.ok) {
        setDiscountOffers(offer);
        onGenerateDiscount(offer);
        alert("Discount generated successfully");
      }
      const data = await response.json();
      console.log(data);
    };
    saveGeneratedDiscount();
  };

  const closeModals = () => {
    closeModal;
    setDiscountOffers(null);
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModals}></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                Generate Discount Offer
              </h2>

              {/* Discount Percentage Dropdown */}
              <div className="mb-4">
                <label className="mr-2">Select Discount Percentage:</label>
                <select
                  value={selectedDiscount}
                  onChange={(e) => setSelectedDiscount(Number(e.target.value))}
                  className="p-2 border rounded">
                  <option value={0}>Select Discount</option>
                  {discountOptions.map((percentage) => (
                    <option key={percentage} value={percentage}>
                      {percentage + " \t"}%
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <InputField
                  type={`date`}
                  id={undefined}
                  label={"Select Expire Date"}
                  className={undefined}
                  value={expireDate}
                  onChange={(e: {target: {value: any}}) =>
                    setExpireDate(e.target.value)
                  }
                />
              </div>

              {/* Button to Generate Discount */}
              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300">
                  Close
                </button>
                <button
                  onClick={generateDiscountOffer}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                  Generate Discount
                </button>
              </div>

              {/* Display Generated Discount */}
              {discountOffers && (
                <div className="mt-4">
                  <p>
                    <strong>Discount Code:</strong> {discountOffers.key}
                  </p>
                  <p>
                    <strong>Discount Percentage:</strong>{" "}
                    {discountOffers.percentage}%
                  </p>
                  <p>
                    <strong>Expiration Date: </strong>{" "}
                    {discountOffers.expireDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export function GenerateDiscountOfferForStudent({userId}: {userId: any}) {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discountOffer, setDiscountOffer] = useState<DiscountOffer | null>(
    null
  );

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDiscountGenerated = (offer: DiscountOffer) => {
    setDiscountOffer(offer);
    // Optionally, send this offer to the backend or perform any other action
    console.log("Generated discount offer:", offer);
  };

  return (
    <>
      <div className="p-5">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600">
          Discount
        </button>
      </div>

      <GenerateDiscountOffer
        isOpen={isOpen}
        closeModal={closeModal}
        onGenerateDiscount={handleDiscountGenerated}
        userId={userId}
      />
    </>
  );
}
