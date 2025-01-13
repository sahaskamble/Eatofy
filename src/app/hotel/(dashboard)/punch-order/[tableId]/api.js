// src/app/hotel/(dashboard)/punch-order/[tableId]/api.js

export const fetchGstSettings = async () => {
  try {
    const response = await fetch('/api/hotel/settings/gst/fetch');
    const data = await response.json();
    console.log(data)
    return await response.json();
  } catch (error) {
    console.error('Error fetching GST settings:', error);
    return { returncode: 500, message: error.message };
  }
};

export const fetchVatSettings = async () => {
  try {
    const response = await fetch('/api/hotel/settings/vat/fetch');
    return await response.json();
  } catch (error) {
    console.error('Error fetching VAT settings:', error);
    return { returncode: 500, message: error.message };
  }
};

export const fetchEatocoinsSettings = async () => {
  try {
    const response = await fetch('/api/hotel/settings/eatocoins/fetch');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Eatocoins settings:', error);
    return { returncode: 500, message: error.message };
  }
};