const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  birthDate: { type: Date },
  joinedDate: { type: Date, default: Date.now },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
