/**
 * Filter options for dropdowns
 */
export const FILTER_OPTIONS = {
  customerRegion: ['North', 'South', 'East', 'West', 'Central'],
  gender: ['Male', 'Female'],
  productCategory: ['Electronics', 'Clothing', 'Beauty'],
  tags: ['smart', 'portable', 'wireless', 'gadgets', 'fashion', 'casual', 'organic', 'skincare'],
  paymentMethod: ['Cash', 'Credit Card', 'Debit Card', 'UPI']
};

/**
 * Sort options
 */
export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Date (Newest First)' },
  { value: 'date-asc', label: 'Date (Oldest First)' },
  { value: 'quantity-desc', label: 'Quantity (High to Low)' },
  { value: 'quantity-asc', label: 'Quantity (Low to High)' },
  { value: 'name-asc', label: 'Customer Name (A-Z)' },
  { value: 'name-desc', label: 'Customer Name (Z-A)' }
];

/**
 * Table column definitions
 */
export const TABLE_COLUMNS = [
  { key: "Transaction ID", label: "Transaction ID" },
  { key: "Date", label: "Date" },
  { key: "Customer ID", label: "Customer ID" },
  { key: "Customer Name", label: "Customer Name" },
  { key: "Phone Number", label: "Phone Number" },
  { key: "Gender", label: "Gender" },
  { key: "Age", label: "Age" },
  { key: "Product Category", label: "Product Category" },
  { key: "Quantity", label: "Quantity" },
  { key: "Total Amount", label: "Total Amount" },
  { key: "Customer Region", label: "Customer Region" },
  { key: "Product ID", label: "Product ID" },
  { key: "Employee Name", label: "Employee Name" },
];


/**
 * Pagination settings
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
};