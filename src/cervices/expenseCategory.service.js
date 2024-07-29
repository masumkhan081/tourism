const ExpenseCategory = require("../models/expenseCategory.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const { operableEntities } = require("../config/constants");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getCreateResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createExpenseCategory(data) {
  try {
    const addResult = await ExpenseCategory.create(data);
    console.log("addResult: " + JSON.stringify(addResult));
    return getCreateResponse({
      data: addResult,
      what: operableEntities.expense_category,
    });
  } catch (error) {
    console.log("err: " + JSON.stringify(error));
    return getErrorResponse({ error, what: operableEntities.expense_category });
  }
}
//
async function getExpenseCategories(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({
    query,
    what: operableEntities.expense_category,
  });

  const fetchResult = await ExpenseCategory.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await ExpenseCategory.countDocuments(filterConditions);
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
async function updateExpenseCategory({ id, data }) {
  try {
    const editResult = await ExpenseCategory.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Expense category" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.expense_category });
  }
}
//
async function deleteExpenseCategory(id) {
  try {
    const deleteResult = await ExpenseCategory.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: "Expense category",
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.expense_category });
  }
}

module.exports = {
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
  getExpenseCategories,
};
