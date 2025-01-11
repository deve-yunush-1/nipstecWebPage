/** @format */

import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  role?: string; // Define additional properties if needed, e.g., "exp", "iat", "name", etc.
  [key: string]: any; // To accommodate other dynamic properties in the token payload
}

/**
 * Reads the role from a given token.
 * @param token - The JWT token.
 * @returns The role as a string, or null if not found.
 */
export const getRoleFromToken = (token: string): string | null => {
  try {
    // Decode the token
    const decoded: DecodedToken = jwtDecode(token);

    // Extract and return the role
    return decoded.role || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
