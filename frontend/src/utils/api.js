const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Helper universal untuk request ke backend (GET, POST, PUT, DELETE)
 * Otomatis menyertakan Token Auth dari localStorage jika ada.
 */
async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, config);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request gagal: ${res.status} ${res.statusText}`);
  }

  return data;
}

// Export fungsi pembantu yang siap pakai
export const apiGet = (path) => request(path, { method: 'GET' });

export const apiPost = (path, body) => request(path, {
  method: 'POST',
  body: JSON.stringify(body),
});

export const apiPut = (path, body) => request(path, {
  method: 'PUT',
  body: JSON.stringify(body),
});

export const apiDelete = (path) => request(path, { method: 'DELETE' });