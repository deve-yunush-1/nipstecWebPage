/** @format */

import jwt, {JwtPayload} from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_TOKEN_KEY as string; // Keep consistent with the backend

interface DecodedToken extends JwtPayload {
  id: number;
  userType: string;
}

// Decode and verify the token
export const verifyToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
