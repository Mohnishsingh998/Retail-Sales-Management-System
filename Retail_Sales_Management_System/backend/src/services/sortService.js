const applySort = (data, sortBy) => {
  if (!sortBy) return data;

  const sortedData = [...data];

  switch (sortBy.toLowerCase()) {
    case 'date': // Newest first
      sortedData.sort((a, b) => new Date(b.Date) - new Date(a.Date));
      break;

    case 'quantity': // Highest first
      sortedData.sort((a, b) => b.Quantity - a.Quantity);
      break;

    case 'name': // Alphabetical
      sortedData.sort((a, b) =>
        (a['Customer Name'] || '').toLowerCase()
          .localeCompare((b['Customer Name'] || '').toLowerCase())
      );
      break;

    default:
      break;
  }

  return sortedData;
};

module.exports = { applySort };
