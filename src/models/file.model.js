/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose"); 

const fileSchema = new Schema({
  source: String,
});

const File = model("files", fileSchema);

module.exports = File;
