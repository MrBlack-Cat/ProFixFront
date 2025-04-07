export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<any> => {
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
          }
                  localStorage.setItem('refreshToken', result.data.refreshToken);
        response = await sendRequest(); // retry
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
  
    return response;
  };
  