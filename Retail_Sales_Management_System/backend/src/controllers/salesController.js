const Sale = require('../models/Sale');

const escapeRegex = (str) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildMongoQuery = (q) => {
  const query = {};

  // Search (name or phone)
  if (q.search && q.search.trim()) {
    const s = q.search.trim();
    const searchOr = [
      { 'Customer Name': { $regex: escapeRegex(s), $options: 'i' } }
    ];

    if (/^\d+$/.test(s)) {
      const numSearch = Number(s);
      if (!isNaN(numSearch)) searchOr.push({ 'Phone Number': numSearch });

      searchOr.push({ 'Phone Number': s });
      searchOr.push({
        $expr: {
          $regexMatch: {
            input: { $toString: "$Phone Number" },
            regex: s
          }
        }
      });
    } else {
      searchOr.push({
        'Phone Number': { $regex: escapeRegex(s), $options: 'i' }
      });
    }

    query.$or = searchOr;
  }

  // Filters
  const multiFilter = (key, field) => {
    if (q[key]) {
      const arr = q[key].split(',').map(x => x.trim()).filter(Boolean);
      if (arr.length) query[field] = { $in: arr };
    }
  };

  multiFilter('region', 'Customer Region');
  multiFilter('gender', 'Gender');
  multiFilter('category', 'Product Category');
  multiFilter('payment', 'Payment Method');

  // Age range
  if (q.ageMin || q.ageMax) {
    query.Age = {};
    if (q.ageMin) query.Age.$gte = parseInt(q.ageMin);
    if (q.ageMax) query.Age.$lte = parseInt(q.ageMax);
    if (!Object.keys(query.Age).length) delete query.Age;
  }

  // Date range
  if (q.dateFrom || q.dateTo) {
    query.Date = {};
    if (q.dateFrom) query.Date.$gte = q.dateFrom;
    if (q.dateTo) query.Date.$lte = q.dateTo;
    if (!Object.keys(query.Date).length) delete query.Date;
  }

  // Tag filtering
  if (q.tags) {
    const selected = q.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (selected.length) {
      const tagOr = selected.map(t => ({
        Tags: { $regex: escapeRegex(t), $options: 'i' }
      }));

      if (query.$or) {
        query.$and = [
          { $or: query.$or },
          { $or: tagOr }
        ];
        delete query.$or;
      } else {
        query.$or = tagOr;
      }
    }
  }

  return query;
};

const buildSort = (sortBy) => {
  if (!sortBy) return { Date: -1 };

  const [key, dir] = sortBy.split('-');
  const direction = dir?.toLowerCase().startsWith('asc') ? 1 : -1;

  const map = {
    date: 'Date',
    quantity: 'Quantity',
    name: 'Customer Name',
    amount: 'Total Amount'
  };

  return { [map[key.toLowerCase()] || 'Date']: direction };
};

const getSalesData = async (req, res) => {
  try {
    const {
      search,
      region,
      gender,
      ageMin,
      ageMax,
      category,
      tags,
      payment,
      dateFrom,
      dateTo,
      sortBy,
      page = 1,
      pageSize = 10
    } = req.query;

    const mongoQuery = buildMongoQuery({
      search, region, gender, ageMin, ageMax,
      category, tags, payment, dateFrom, dateTo
    });

    const pageNum = Math.max(1, parseInt(page) || 1);
    const size = Math.max(1, parseInt(pageSize) || 10);
    const skip = (pageNum - 1) * size;

    const sortObj = buildSort(sortBy);
    const totalItems = await Sale.countDocuments(mongoQuery);

    const docs = await Sale.find(mongoQuery)
      .sort(sortObj)
      .skip(skip)
      .limit(size)
      .lean();

    const data = docs.map(doc => ({
      ...doc,
      'Phone Number': doc['Phone Number']?.$numberLong || doc['Phone Number'] || '',
      _id: undefined
    }));

    res.json({
      success: true,
      data,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalItems / size),
        totalItems,
        pageSize: size,
        hasNextPage: pageNum * size < totalItems,
        hasPreviousPage: pageNum > 1
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales data',
      error: err.message
    });
  }
};

module.exports = { getSalesData };
