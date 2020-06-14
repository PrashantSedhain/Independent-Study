const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  userId: { type: String },
  count: { type: Number, require: true },
  groupName: { type: String, require: true },
  names: { type: Array, require: true },
  emails: { type: Array, require: true },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Group", userSchema);
