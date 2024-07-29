const Stock = require("../models/stock.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getCreateResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");
const { operableEntities } = require("../config/constants");

async function createStock(data) {
  try {
    const addResult = await Stock.create(data);
    return getCreateResponse({ data: addResult, what: operableEntities.stock });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.stock });
  }
}
//
async function getStocks(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({query,what:operableEntities.stock});

  const fetchResult = await Stock.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Stock.countDocuments(filterConditions);
  return {
    meta: {
      total,
      limit: viewLimit,
      page: currentPage,
      skip: viewSkip,
      sortBy,
      sortOrder,
    },
    data: fetchResult,
  };
}
//
async function updateStock({ id, data }) {
  try {
    const editResult = await Stock.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.stock,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.stock });
  }
}
// not applicable like this
async function deleteStock(id) {
  try {
    const deleteResult = await Stock.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.stock,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.stock });
  }
}

module.exports = {
  createStock,
  updateStock,
  deleteStock,
  getStocks,
};
