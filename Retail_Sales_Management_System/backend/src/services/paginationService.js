const applyPagination = (data, page = 1, pageSize = 10) => {
  const currentPage = Math.max(1, parseInt(page) || 1);
  const size = parseInt(pageSize) || 10;

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / size);

  // Handle invalid page numbers
  const validPage = Math.min(currentPage, totalPages || 1);

  const startIndex = (validPage - 1) * size;
  const endIndex = startIndex + size;

  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: validPage,
      totalPages: totalPages || 1,
      totalItems,
      pageSize: size,
      hasNextPage: validPage < totalPages,
      hasPreviousPage: validPage > 1
    }
  };
};

module.exports = { applyPagination };