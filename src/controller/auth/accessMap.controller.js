const accessMapService = require("../../cervices/auth/accessMap.service");
const httpStatus = require("http-status");

async function createAccessMap(req, res) {
  const result = await accessMapService.createaccessMap(req.body);
  res.send(result);
}
async function getAccessMaps(req, res) {
  // pagination check & logic

  const result = await accessMapService.getAccessMaps(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "AccessMaps fetched successfully",
    data: result,
  });
}
//
async function updateaccessMap(req, res) {
  const result = await accessMapService.updateaccessMap({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteaccessMap(req, res) {
  const result = await accessMapService.deleteaccessMap(req.params.id);
  res.send(result);
}
//
module.exports = {
  createaccessMap,
  updateaccessMap,
  deleteaccessMap,
  getAccessMaps,
};
