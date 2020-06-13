const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  count: { type: Number, require: true },
  name: { type: String, require: true },
  names: { type: Array },
  emails: { type: Array },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Group", userSchema);
