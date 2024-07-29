const Discount = require("../models/discount.model");
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

async function createDiscount(data) {
  try {
    const addResult = await Discount.create(data);
    return getCreateResponse({
      data: addResult,
      what: operableEntities.discount,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.discount });
  }
}

async function getDiscounts(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({query,what:operableEntities.});

  const fetchResult = await Discount.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Discount.countDocuments(filterConditions);
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

async function updateDiscount({ id, data }) {
  try {
    const editResult = await Discount.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.discount,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.discount });
  }
}

async function deleteDiscount(id) {
  try {
    const deleteResult = await Discount.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.discount,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.discount });
  }
}

module.exports = {
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscounts,
};
