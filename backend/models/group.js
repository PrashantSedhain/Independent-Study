const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const groupSchema = mongoose.Schema({
  userId: { type: String, require: true },
  count: { type: Number, require: true },
  groupName: { type: String, require: true },
  names: { type: Array, require: true },
  emails: { type: Array, require: true },
});

groupSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Group", groupSchema);
