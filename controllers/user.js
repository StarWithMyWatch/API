const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: req.body.type,
      sex: req.body.sex,
      points: req.body.points,
      photo: req.body.photo,
      codeP: req.body.codeP,
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
      }); */
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  console.log("début")
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      console.log("user", user);
      if (!user) {
        console.log("Auth failed 1");
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      console.log("Auth failed 2");
      if (!result) {
        console.log("Auth failed 2");
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign({
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        process.env.JWT_KEY, {
          expiresIn: "12h"
        }
      );
      res.status(200).json({
        token: token,
        expiresIn: 43200,
        userId: fetchedUser._id
      });
      console.log("token", token);
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


exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "user not found!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user failed!"
      });
    });
};

exports.getFemmes = (req, res, next) => {
  let photosfemmes = []
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
        photoshommes.push(photosH)
        console.log("documents part 1", photoshommes);
      }
    }
    res.status(200).json({
      message: "users fetched successfully!",
      hommes: photoshommes

    });
  });
};

// by with many ==> take a points 5 || j'attends le découdage du token
//le cahmp de code est vide donc on va ajouter un code||ok
exports.updatePointWhenBuy = (req, res, next) => { 
  User.updateOne({
    _id: req.body._id
  }, {
    $inc: {
      "points": 5
    },
    $set: {
      "codeP": "SW" + req.body._id + "MW" // req.body._id replace with mail
    }
  }).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({
        message: "Update successful!",
        result: result
      });
    } else {
      res.status(401).json({
        message: "Not authorized!"
      });
    }
  });
};


//get 10 point thanks to the code user
exports.updatePointByCode = (req, res, next) => {
  
// update first user qui a fait le paraignage 
  User.updateOne({
    codeP: req.body.codeP, 
  }, {
    $inc: {
      "points": 10
    }
  }).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({
        message: "Update successful!",
        result: result
      });
    } else {
      res.status(401).json({
        message: "Not authorized!"
      });
    }
  });

// update second user qui a utiliser le code du parain  
User.updateOne({
  _id: req.body._id, 
}, {
  $inc: {
    "points": 5
  },
  $set: {
    "codeP": "SW" + req.body._id + "MW" // req.body._id replace with mail dans le token
  }
}).then(result => {
  if (result.nModified > 0) {
    res.status(200).json({
      message: "Update successful!",
      result: result
    });
  } else {
    res.status(401).json({
      message: "Not authorized!"
    });
  }
});

};



/* console.log("req",req);
  User.findById("5da8512a02430213208eb2e6")
    .then(user => {
      if (user) {
        res.status(200).json(user);
        //console.log("oneUser",user);
      } else {
        res.status(404).json({
          message: "user not found!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user failed!"
      });
    }); */
/*   const user = {
    _id: req.body._id,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    type: req.body.type,
    sex: req.body.sex,
    points: req.body.points,
    photo: req.body.photo,
    codeP: req.body.codeP,
  }; */