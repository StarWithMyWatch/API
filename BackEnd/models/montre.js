const mongoose = require("mongoose");

const montreSchema = mongoose.Schema({
  prix: { type: String, required: true },
  description: { type: String, required: true },
  images: [String]
  //creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
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