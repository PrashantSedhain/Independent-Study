const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  count: { type: Number, require: true },
  person: [{ type: Array }, [{ type: Array }]],
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Group", userSchema);
