// src/utils/auth.ts
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  userId: number;
  email?: string;
  role?: string;
  [key: string]: any; 
}

const nameIdClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
const emailClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

/**
 * Decode token - userId, email  role
 */
export const getDecodedToken = (): DecodedToken | null => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);

    const userIdRaw = decoded[nameIdClaim] || decoded["nameid"];
    const emailRaw = decoded[emailClaim] || decoded["email"];
    const roleRaw = decoded[roleClaim];

    const role = Array.isArray(roleRaw) ? roleRaw[0] : roleRaw;
    const userId = parseInt(userIdRaw);

    if (isNaN(userId) || !emailRaw || !role) {
      console.error("Invalid data in token:", { userIdRaw, emailRaw, roleRaw });
      return null;
    }

    return {
      userId,
      email: emailRaw,
      role,
    };
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};

/**
chech autorization */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

/**
Rol check */
export const hasRole = (role: string): boolean => {
  const decoded = getDecodedToken();
  return decoded?.role === role;
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};
