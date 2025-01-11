/** @format */

import {User} from "./User";

export type LeaveRequest = {
  leaveId: number;
  leaveReason: string;
  description: string;
  startDate: string; // Use string or Date depending on how you handle it
  endDate: string; // Use string or Date depending on how you handle it
  leaveRequestStatus: "APPROVED" | "PENDING" | "REJECTED"; // Assuming these are the possible values
  createdAt: string; // Use string or Date depending on how you handle it
  user: User;
};
