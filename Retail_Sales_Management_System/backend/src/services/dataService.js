const { loadCSVData } = require('../utils/dataLoader');

let cachedData = null;
let isLoading = false;
let loadPromise = null;

const loadData = async () => {
  // If data is already cached, return it
  if (cachedData) {
    return cachedData;
  }

  // If loading is in progress, wait for it
  if (isLoading) {
    return loadPromise;
  }

  // Start loading
  isLoading = true;
  loadPromise = loadCSVData()
    .then(data => {
      cachedData = data;
      isLoading = false;
      return data;
    })
    .catch(error => {
      isLoading = false;
      throw error;
    });

  return loadPromise;
};

const getData = async () => {
  return await loadData();
};

const isDataLoaded = () => {
  return cachedData !== null;
};

module.exports = { getData, isDataLoaded };