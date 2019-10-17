const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const BASEAPPURL = process.env.BASEAPPURL || 'http://localhost:3000/';

const User = require("../models/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password:hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: "user",
        sex: req.body.sex,
        points: 0,
        photo: null,
        codeP: {"code": null,"nbInvitation":0}
      });
      user.save()
      .then(newUser => {
        res.status(201).json({
          message: "User created!",
          result: newUser
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Internal error during user creation!"
        });
      });
    });
};

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
        "SE56AR4T98ER49TGR495H8G4F98H584ZH5E6R",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        user: fetchedUser
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

exports.getUsers = (req, res, next) => {
  User.find().then(users => {
    //Montre vient de la partie modèle de post.js module.exports = mongoose.model('Post', postSchema);
    // console.log("documents part 1",documents);
    res.status(200).json({
      message: "users fetched successfully!",
      users: users
    });
  })
  .catch(err => {
    return res.status(500).json({
        message: "Could not fetch user list!"
      });
    });
};

exports.getFemmes = (req, res, next) => {
  let photosfemmes = [];
  User.find().then(user => {
    for (let i = 0; i < user.length; i++) {
      if (user[i].sex === "femme" && user[i].type === "user") {
        //photosfemmes = user[i].photo
        photosF = {
          id: user[i]._id,
          photo: user[i].photo,
        };
        photosfemmes.push(photosF);
        console.log("documents part 1", photosfemmes);
      }
    }
    res.status(200).json({
      message: "users fetched successfully!",
      femmes: photosfemmes

    });
  });
};

exports.getHommes = (req, res, next) => {
  let photoshommes = [];
  User.find().then(user => {
    for (let i = 0; i < user.length; i++) {
      if (user[i].sex === "homme" && user[i].type === "user") {
        photosH = {
          id: user[i]._id,
          photo: user[i].photo,
        };
        photoshommes.push(photosH);
        console.log("documents part 1", photoshommes);
      }
    }
    res.status(200).json({
      message: "users fetched successfully!",
      hommes: photoshommes

    });
  });
};

exports.setImageToUser = (req, res, next) => {
        User.updateOne(
            {_id: req.body.id},
            {
              $set: {
                "photo" : BASEAPPURL + req.file.path,
              }
            }).then(user => {
          res.send({
            user: user,
            error: null
          });
        }).catch(err => {
          res.send({
            id: req.body.id,
            error: err
          });
        })

};