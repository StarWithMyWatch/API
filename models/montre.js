const mongoose = require("mongoose");

const montreSchema = mongoose.Schema({
  //prix: { type: Number, required: true },
  //description: { type: String, required: true },
  images: { type: String }
});

module.exports = mongoose.model("Montre", montreSchema);














/* const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Post", postSchema);
 */