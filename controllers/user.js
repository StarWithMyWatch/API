const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password:hash,
      firstNmae: req.body.firstNmae,
      lastName: req.body.lastName,
      type: req.body.type,
      sex: req.body.sex,
      ponits: req.body.ponits,
      photo: req.body.photo,
      codeP:req.body.codeP,
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
    /*   .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      }); */ // TODO Décommenter et tester
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "12h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

exports.getUsers = (req, res, next) => {
  User.find().then(documents => {
    //Montre vient de la partie modèle de post.js module.exports = mongoose.model('Post', postSchema);
    // console.log("documents part 1",documents);
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents

    });
  });

};


exports.getUsers = (req, res, next) => {
  User.find().then(documents => {
    //Montre vient de la partie modèle de post.js module.exports = mongoose.model('Post', postSchema);
    // console.log("documents part 1",documents);
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents

    });
  });

};


/* exports.getFemmes = (req, res, next) => {
  User.find().then(documents => {
    //Montre vient de la partie modèle de post.js module.exports = mongoose.model('Post', postSchema);
    // console.log("documents part 1",documents);
    if(documents.sex="femme")
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents

    });
  });

}; */
