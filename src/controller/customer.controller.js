const CustomerService = require("../cervices/customer.service");
const httpStatus = require("http-status");

async function createCustomer(req, res) {
  const result = await CustomerService.createCustomer(req.body);
  res.send(result);
}
async function getCustomers(req, res) {
  const result = await CustomerService.getCustomers(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Customers fetched successfully",
    data: result,
  });
}
//
async function updateCustomer(req, res) {
  const result = await CustomerService.updateCustomer({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteCustomer(req, res) {
  const result = await CustomerService.deleteCustomer(req.params.id);
  res.send(result);
}
//
module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
};
