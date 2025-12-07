const normalize = (str) =>
  String(str || "").trim().toLowerCase();

const applyFilters = (data, filters) => {
  let filteredData = [...data];

  // Region Filter
  if (filters.region?.length) {
    const regions = filters.region.map(normalize);

    filteredData = filteredData.filter(item =>
      regions.includes(normalize(item["Customer Region"]))
    );
  }

  // Gender Filter
  if (filters.gender?.length) {
    const genders = filters.gender.map(normalize);

    filteredData = filteredData.filter(item =>
      genders.includes(normalize(item.Gender))
    );
  }

  // Product Category Filter
  if (filters.category?.length) {
    const cats = filters.category.map(normalize);

    filteredData = filteredData.filter(item =>
      cats.includes(normalize(item["Product Category"]))
    );
  }

  // Payment Method Filter
  if (filters.payment?.length) {
    const pay = filters.payment.map(normalize);

    filteredData = filteredData.filter(item =>
      pay.includes(normalize(item["Payment Method"]))
    );
  }

  // Tags Filter
  if (filters.tags?.length) {
    filteredData = filteredData.filter(item => {
      const itemTags = item.Tags ? item.Tags.split(",").map(normalize) : [];
      return filters.tags.some(tag => itemTags.includes(normalize(tag)));
    });
  }

  // Age Range
  if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
    filteredData = filteredData.filter(item => {
      const age = item.Age;
      return (
        (filters.ageMin === undefined || age >= Number(filters.ageMin)) &&
        (filters.ageMax === undefined || age <= Number(filters.ageMax))
      );
    });
  }

  // Date Range
  if (filters.dateFrom || filters.dateTo) {
    filteredData = filteredData.filter(item => {
      const date = new Date(item.Date);
      const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
      const to = filters.dateTo ? new Date(filters.dateTo) : null;

      return (!from || date >= from) && (!to || date <= to);
    });
  }

  return filteredData;
};

module.exports = { applyFilters };
