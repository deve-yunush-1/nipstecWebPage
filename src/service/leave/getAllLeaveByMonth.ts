/** @format */

import {DB_URL} from "@/modal/db_url";
export const getAllLeavedByCurrentMonth = async (
  month: number,
  year: number
) => {
  try {
    const response = await fetch(
      `${DB_URL()}/user/leave?month=${month}&year=${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response status is OK (200)
    if (!response.ok) {
      // Throw an error if the response is not successful
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the data if no errors occurred
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch operation
    console.error("Error fetching allocated leaves:", error);
    // Optionally, you can return an empty array or a custom error message here
    return {error: "An error occurred while fetching data."};
  }
};
