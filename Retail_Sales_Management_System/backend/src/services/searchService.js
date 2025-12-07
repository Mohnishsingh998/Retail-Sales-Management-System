const applySearch = (data, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') {
    return data;
  }

  const query = searchQuery.toLowerCase().trim();

  return data.filter(item => {
    const customerName = (item['Customer Name'] || '').toLowerCase();
    const phoneNumber = (item['Phone Number'] || '').toLowerCase();

    return customerName.includes(query) || phoneNumber.includes(query);
  });
};

module.exports = { applySearch };
