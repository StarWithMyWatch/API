const Montre = require("../models/montre");
const MailController = require('./mail');

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
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a montre failed!"
      });
    });
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

exports.buyMontre = (req, res, next) => {

  let message = "<!DOCTYPE html>" +
      "<html>" +
      "<t/><h3>Bonjour " + user.prenom + " " + user.nom + ", </h3><br/>" +
      "<h4>Vous avez commandé des produits sur <a href='#'>WasteMart</a>. <br/>" +
      "Vous trouverez ci-joint la facture de votre achat contenant les modalités de livraison de votre commande." +

      "<br/><br/>" +
      "Nous vous remercions de votre achat, et espérons vous revoir rapidement !" +
      "<br/><br/>" +
      "L'équipe WasteMart. " +
      "</h4>" +


      "</html>";

  MailController.sendMail("wastemart.company@gmail.com", user.mail, "Votre commande du " + day + "/" + month + "/" + date[0], message, 'factures/facture_cmd_' + idCommande + '.pdf');


  const put = new Montre({
    nom: req.body.nom,
    description: req.body.desc,
    prix: req.body.prix,
    image: req.body.image
    //images: url + "/images/" + req.file.filename,
  });
  put
      .save()
      .then(createdMontre => {
        res.status(201).json({
          message: "Post added successfully",
          post: {
            ...createdMontre,
            id: createdMontre._id
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Creating a montre failed!"
        });
      });
}


/* exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
}; */

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
