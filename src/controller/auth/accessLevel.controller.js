const accessLevelService = require("../../cervices/auth/accessLevel.service");
const httpStatus = require("http-status");

async function createAccessLevel(req, res) {
  const result = await accessLevelService.createAccessLevel(req.body);
  res.send(result);
}
async function getAccessLevels(req, res) {
  // pagination check & logic

  const result = await accessLevelService.getAccessLevels(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "AccessLevels fetched successfully",
    data: result,
  });
}
//
async function updateAccessLevel(req, res) {
  const result = await accessLevelService.updateAccessLevel({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteAccessLevel(req, res) {
  const result = await accessLevelService.deleteAccessLevel(req.params.id);
  res.send(result);
}
//
module.exports = {
  createAccessLevel,
  updateAccessLevel,
  deleteAccessLevel,
  getAccessLevels,
};
