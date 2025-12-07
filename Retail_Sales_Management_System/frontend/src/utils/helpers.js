/**
 * Format currency to Indian Rupees
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  const value = Number(amount);

  if (isNaN(value)) return "₹0";

  return "₹" + value.toLocaleString("en-IN", {
    maximumFractionDigits: 0
  });
};

/**
 * Copy text to clipboard
 * @param {string} text 
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Format phone number with country code
 * @param {string} phone 
 * @returns {string}
 */
export const formatPhoneNumber = (phone) => {
  return `+91 ${phone}`;
};

/**
 * Get status badge color class
 * @param {string} status 
 * @returns {string}
 */
export const getStatusColor = (status) => {
  const statusColors = {
    'Completed': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'Returned': 'bg-gray-100 text-gray-800'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Format date to readable format
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Pad number with leading zeros
 * @param {number} num 
 * @param {number} size 
 * @returns {string}
 */
export const padNumber = (num, size = 2) => {
  return String(num).padStart(size, '0');
};

export const removeHyphens = (value) => {
  if (!value) return "";
  return String(value).replace(/-/g, "");
};

