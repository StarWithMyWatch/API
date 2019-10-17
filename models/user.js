const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, unique: true},
  password: { type: String},
  firstNmae: { type: String},
  lastName: { type: String },
  type: { type: String },
  sex: { type: String},
  ponits: { type: Number },
  photo: { type: String},
 // codeP: { code: String}
 codeP: { code: String, nbInvitation:Number},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
