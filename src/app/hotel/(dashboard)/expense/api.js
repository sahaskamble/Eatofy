const API_URL = '/api/hotel/expenses';

export const fetchExpenses = async () => {
  const response = await fetch(`${API_URL}/fetch`);
  return await response.json();
};

export const addExpense = async (expenseData) => {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  return await response.json();
};

export const editExpense = async (id, expenseData) => {
  const response = await fetch(`${API_URL}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  return await response.json();
};

export const removeExpense = async (id) => {
  const response = await fetch(`${API_URL}/remove`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
  return await response.json();
};
