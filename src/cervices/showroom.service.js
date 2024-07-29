const Showroom = require("../models/showroom.model");

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

async function createShowroom(data) {
  try {
    const addResult = await Showroom.create(data);
    return getCreateResponse({
      data: addResult,
      what: operableEntities.showroom,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.showroom });
  }
}
//
async function getShowrooms(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({query,what:operableEntities.showroom});

  const fetchResult = await Showroom.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Showroom.countDocuments(filterConditions);
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
async function updateShowroom({ id, data }) {
  try {
    const editResult = await Showroom.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.showroom,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.showroom });
  }
}
//
async function deleteShowroom(id) {
  try {
    const deleteResult = await Showroom.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.showroom,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.showroom });
  }
}

module.exports = {
  createShowroom,
  updateShowroom,
  deleteShowroom,
  getShowrooms,
};
