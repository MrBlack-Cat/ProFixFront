import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: number;
  email: string;
  role: string;
}

/**
 * Извлекает данные из accessToken в localStorage (userId, email, role)
 */
export const getDecodedToken = (): DecodedToken | null => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);

    const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const role = Array.isArray(decoded[roleClaim])
      ? decoded[roleClaim][0]
      : decoded[roleClaim];

    return {
      userId: parseInt(decoded["nameid"]),
      email: decoded["email"],
      role,
    };
  } catch (err) {
    console.error("❌ Ошибка при декодировании токена", err);
    return null;
  }
};

/**
 * Выполняет fetch-запрос с авторизацией. При 401 — пытается обновить токен и повторить.
 */
export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  let accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const sendRequest = async () => {
    return await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  let response = await sendRequest();

  if (response.status === 401 && refreshToken) {
    const refreshResponse = await fetch('https://localhost:7164/api/Users/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResponse.ok) {
      const result = await refreshResponse.json();
      accessToken = result.data.accessToken;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);
      }

      response = await sendRequest(); // retry original request
    } else {
      // Refresh token failed — logout
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  }

  return response;
};
