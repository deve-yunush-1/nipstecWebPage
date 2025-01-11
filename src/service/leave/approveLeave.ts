/** @format */

import {DB_URL} from "@/modal/db_url";

export const approveLeaveRequest = async (
  leaveId: string,
  leaveStatus: string
) => {
  try {
    // Corrected URL by fixing the extra curly brace
    const response = await fetch(`${DB_URL()}/user/leave/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({leaveId, leaveStatus}),
    });

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error(
        `Failed to approve leave request: ${response.statusText}`
      );
    }

    // Parse the response data
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error approving leave request:", error);
    return {error: "An error occurred while approving the leave request."};
  }
};
