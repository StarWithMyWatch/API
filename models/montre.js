const mongoose = require("mongoose");

const montreSchema = mongoose.Schema({
  nom: { type: String },
  description: { type: String },
  prix: { type: Number},
  image: { type: String}
  //images: { type: String }
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