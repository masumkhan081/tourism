/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");

const acessMapSchema = new Schema(
  {
    entity: {
      type: String,
      required: true,
    },
    functions: [String],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const AccessMap = model("accessMap", acessMapSchema);

module.exports = AccessMap;
