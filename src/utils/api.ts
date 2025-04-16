import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: number;
  email: string;
  role: string;
}

/**
 * Извлекает userId, email и role из accessToken
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

export const uploadToCloud = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchWithAuth(`https://localhost:7164/api/FileUpload/upload-guarantee-file`, {
    method: 'POST',
    body: formData,
  });

  const json = await res.json();

  if (json.isSuccess && json.data?.url) {
    return json.data.url;
  } else {
    console.error("❌ File upload failed:", json);
    throw new Error("File upload failed");
  }
};



/**
 * Делает авторизованный fetch. При 401 — обновляет токен и повторяет запрос.
 */
export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  let accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  console.log("⚙️ fetchWithAuth вызван →", url);
  console.log("🔐 accessToken →", accessToken);
  console.log("🔁 refreshToken →", refreshToken);
  console.log("📦 options →", options);

  const sendRequest = async () => {
    const isFormData = options.body instanceof FormData;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken || ''}`,
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    return fetch(url, {
      ...options,
      headers,
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

      response = await sendRequest(); // повтор запроса
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  }

  return response;
};
