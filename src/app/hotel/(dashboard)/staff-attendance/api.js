const API_URL = '/api/hotel/staff';

export const fetchAttendance = async () => {
  const response = await fetch(`${API_URL}/attendance`);
  return await response.json();
};

export const addAttendance = async (data) => {
  const response = await fetch(`${API_URL}/attendance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const editAttendance = async (id, data) => {
  const response = await fetch(`${API_URL}/attendance/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const removeAttendance = async (id) => {
  const response = await fetch(`${API_URL}/attendance/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};