// GST Settings
export async function fetchGSTSettings() {
  const response = await fetch('/api/hotel/settings/gst/fetch');
  if (!response.ok) throw new Error('Failed to fetch GST settings');
  return response.json();
}

export async function updateGSTSettings(data) {
  const response = await fetch('/api/hotel/settings/gst/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update GST settings');
  return response.json();
}

// VAT Settings
export async function fetchVATSettings() {
  const response = await fetch('/api/hotel/settings/vat/fetch');
  if (!response.ok) throw new Error('Failed to fetch VAT settings');
  return response.json();
}

export async function updateVATSettings(data) {
  const response = await fetch('/api/hotel/settings/vat/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update VAT settings');
  return response.json();
}

// Printer Settings
export async function fetchPrinterSettings() {
  const response = await fetch('/api/hotel/settings/printer/invoice/fetch');
  if (!response.ok) throw new Error('Failed to fetch printer settings');
  return response.json();
}

export async function updatePrinterSettings(data) {
  const response = await fetch('/api/hotel/settings/printer/invoice/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update printer settings');
  return response.json();
}

// KOT Settings
export async function fetchKOTSettings() {
  const response = await fetch('/api/hotel/settings/printer/kot/fetch');
  if (!response.ok) throw new Error('Failed to fetch KOT settings');
  return response.json();
}

export async function updateKOTSettings(data) {
  const response = await fetch('/api/hotel/settings/printer/kot/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update KOT settings');
  return response.json();
}

// Loyalty Settings (Eatocoins)
export async function fetchLoyaltySettings() {
  const response = await fetch('/api/hotel/settings/eatocoins/fetch');
  if (!response.ok) throw new Error('Failed to fetch loyalty settings');
  return response.json();
}

export async function updateLoyaltySettings(data) {
  const response = await fetch('/api/hotel/settings/eatocoins/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update loyalty settings');
  return response.json();
}

// Hotel Profile
export async function fetchHotelProfile() {
  const response = await fetch('/api/hotel/settings/profile/fetch',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hotel_id: localStorage.getItem('hotel_id') }),
  });
  if (!response.ok) throw new Error('Failed to fetch hotel profile');
  return response.json();
}

export async function updateHotelProfile(data) {
  const response = await fetch('/api/hotel/settings/profile/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update hotel profile');
  return response.json();
} 