// Items API
export async function fetchItems() {
  const response = await fetch('/api/hotel/inventory/items/fetch', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch items');
  }
  
  return response.json();
}

export async function addItem(data) {
  const response = await fetch('/api/hotel/inventory/items/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add item');
  }
  
  return response.json();
}

export async function editItem(data) {
  const response = await fetch('/api/hotel/inventory/items/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to edit item');
  }
  
  return response.json();
}

export async function removeItem(itemId) {
  const response = await fetch('/api/hotel/inventory/items/remove', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: itemId }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete item');
  }
  
  return response.json();
}

// Stock API
export async function fetchStock() {
  const response = await fetch('/api/hotel/inventory/stock/fetch', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch stock');
  }
  
  return response.json();
}

export async function updateStock(data) {
  const response = await fetch('/api/hotel/inventory/stock/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update stock');
  }
  
  return response.json();
}

// Purchase API
export async function fetchPurchases() {
  const response = await fetch('/api/hotel/inventory/purchase/fetch', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch purchases');
  }
  
  return response.json();
}

export async function addPurchase(data) {
  const response = await fetch('/api/hotel/inventory/purchase/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add purchase');
  }
  
  return response.json();
}

export async function editPurchase(data) {
  const response = await fetch('/api/hotel/inventory/purchase/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to edit purchase');
  }
  
  return response.json();
}

export async function removePurchase(purchaseId) {
  const response = await fetch('/api/hotel/inventory/purchase/remove', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ purchase_id: purchaseId }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete purchase');
  }
  
  return response.json();
} 