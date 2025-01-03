// Fetch Suppliers
export async function fetchSuppliers() {
  const response = await fetch('/api/hotel/inventory/suppliers/fetch', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch suppliers');
  }

  return response.json();
}

// Add Supplier
export async function addSupplier(data) {
  const response = await fetch('/api/hotel/inventory/suppliers/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add supplier');
  }

  return response.json();
}

// Edit Supplier
export async function editSupplier(data) {
  const response = await fetch('/api/hotel/inventory/suppliers/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to edit supplier');
  }

  return response.json();
}

// Remove Supplier
export async function removeSupplier(supplierId) {
  const response = await fetch('/api/hotel/inventory/suppliers/remove', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ supplier_id: supplierId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete supplier');
  }

  return response.json();
} 
