const API_URL = '/api/hotel/staff';

export const fetchStaff = async () => {
  const response = await fetch(`${API_URL}`);
  return await response.json();
};

export const addStaff = async (data) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const editStaff = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const removeStaff = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};