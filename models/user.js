const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstNmae: { type: String, required: true },
  lastName: { type: String, required: true },
  type: { type: String, required: true },
  sex: { type: String},
  ponits: { type: Number },
  photo: { type: String},
  codeP: { code: String, nbInvitation:Number},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
