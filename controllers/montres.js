const Montre = require("../models/montre");

exports.createMontre = (req, res, next) => {
  //const url = req.protocol + "://" + req.get("host");
  const post = new Montre({
    nom: req.body.nom,
    description: req.body.desc,
    prix: req.body.prix,
    image: req.body.image
    //images: url + "/images/" + req.file.filename,
  });
  post
    .save()
    .then(createdMontre => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdMontre,
          id: createdMontre._id
        }
      });
    });
    /* .catch(error => {
      res.status(500).json({
        message: "Creating a montre failed!"
      });
    }); */
};



exports.getMontres = (req, res, next) => {
  Montre.find().then(documents => {
    //Montre vient de la partie modèle de post.js module.exports = mongoose.model('Post', postSchema);
    // console.log("documents part 1",documents);
    res.status(200).json({
      message: "Montres fetched successfully!",
      montres: documents

    });
  });
 
};

exports.getMontre = (req, res, next) => {
  Montre.findById(req.params.id)
    .then(montre => {
      if (montre) {
        res.status(200).json(montre);
      } else {
        res.status(404).json({ message: "Montre not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching montre failed!"
      });
    });
};

/* exports.deleteMontre = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
}; */



/* exports.updateMontre = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
}; */
