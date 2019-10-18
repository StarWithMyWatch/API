const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const MailController = require('./mail');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {

    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: "user",
      sex: req.body.sex,
      points: 0,
      photo: null,
      codeP: {
        "code": null,
        "nbInvitation": 0
      }
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
  User.findOne({
      email: req.body.email
    })
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
      const token = jwt.sign({
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        "SE56AR4T98ER49TGR495H8G4F98H584ZH5E6R", {
          expiresIn: "1h"
        }
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
  /*  let token = req.header('Authorization').split(" ")[1];
   let payload = jwt.decode(token, {
     json: true
   });
   console.log("token", token);
   console.log("userId", payload.userId);
   console.log("email", payload.email); */
  const subject = "Votre Code d'achat";
  const message = "vous trouvrez ci-dessous un code à partager à fin de ganer des points ....." + "SW" + req.body.email + "MW";
  console.log("req.body.codeP", req.body.code);
  //Achat sans code
  if (req.body.code === "") {

    User.updateOne({
      email: req.body.email // id de celui qui a achté la montre
    }, {
      $inc: {
        "points": 5
      },
      $set: {
        "codeP": "test" + req.body.email + "MW" // lui donner un code "req.body._id replace with mail"
      }
    }).then(result => {
      if (result.nModified > 0) {
        res.status(200).json({
          message: "Update successful! sans code",
          result: result
        });
      } else {
        res.status(401).json({
          message: "Not authorized sans code!"
        });
      }
    });

    console.log("req.body.email ", req.body.emailOneMen);
    console.log("req.body.email ", req.body.idMenOne);

    //send mail sans code 
    MailController.sendMail("starmywatch@gmail.com",
      req.body.email, subject, message);

  }

  //Achat avec code
  else {
    User.updateOne({
      codeP: req.body.code, //utilisation de code
    }, {
      $inc: {
        "points": 10
      }
    }).then(result => {
      if (result.nModified <= 5) {
        res.status(200).json({
          message: "Update successful j'ai ganger des points grace au code!",
          result: result,
          code: "code est bon "
        });
      } else {
        res.status(200).json({
          message: "Not authorized!",
          code: "code est expiré"
        });
      }
    });
    //send mail with code 
    MailController.sendMail("starmywatch@gmail.com",
      req.body.email, subject, message);

    // update second user qui a utiliser le code du parain  
    User.updateOne({
      email: req.body.email, // id de l'utilisateur qui vient d'achter la montre avec un code
    }, {
      $inc: {
        "points": 5
      },
      $set: {
        "codeP": {
          "code": "SW" + req.body.email + "MW",
          "nbInvitation": 0
        } // req.body._id replace with mail dans le token
      }
    }).then(result => {
      if (result.nModified > 0) {
        res.status(200).json({
          message: "Update successful j'ai achter une montre!",
          result: result
        });
      } else {
        res.status(401).json({
          message: "Not authorized!"
        });
      }
    });


  }


};

//*******/ by with Points ==> -100pts*********//
exports.updatePointWhenPoints = (req, res, next) => {
  /*   let token = req.header('Authorization').split(" ")[1];
    let payload = jwt.decode(token, {
      json: true
    });
    console.log("token", token);
    console.log("userId", payload.userId);
    console.log("email", payload.email); */
  const subject = "Votre Code d'achat";
  const message = "vous trouvrez ci-dessous un code à partager à fin de ganer des points ....." + "SW" + req.body.email + "MW";

  User.updateOne({
    email: req.body.email // id de celui qui a achté la montre
  }, {
    $inc: {
      "points": -100
    }
  }).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({
        message: "paie successful -100",
        result: result
      });
    } else {
      res.status(401).json({
        message: "Not authorized sans code!"
      });
    }
  });
  //send mail with code 
  MailController.sendMail("starmywatch@gmail.com",
    req.body.email, subject, message);
};






//***** update star user*****//
exports.updateUserPointAfeterSelectStar = (req, res, next) => {
  const subject = "Concours photo";
  const message = "vous êtes sélectionnés pour participer à la réalisation de un spot publicitaires le 20/01/2019" +
    "Vous êtes le STAR de ces 2 mois." +
    "Vivez une expérience innobliable avec AUGARDE "
  console.log("req.body.email ", req.body.emailOneMen);
  console.log("req.body.email ", req.body.idMenOne);

  //send mail to menOne
  MailController.sendMail("starmywatch@gmail.com",
    req.body.emailOneMen, subject, message);
  //send mail to OneWomen
  MailController.sendMail("starmywatch@gmail.com",
    req.body.emailOneWomen, subject, message);
  //send mail to towWomen
  MailController.sendMail("starmywatch@gmail.com",
    req.body.emailTowWomen, subject, message);
  //send mail to menTow,
  MailController.sendMail("starmywatch@gmail.com",
    req.body.emailTowMen, subject, message);


  //for id 1
  User.updateOne({
    email: req.body.emailMenOne // id de celui qui a achté la montre
  }, {
    $inc: {
      "points": 5
    }
  }).then(result => {
    //console.log("result.nModified",result.nModified)
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




  //for  id 2
  User.updateOne({
    email: req.body.emailMenTwo // id de celui qui a achté la montre
  }, {
    $inc: {
      "points": 5
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

  //for  id 3
  User.updateOne({
    email: req.body.emailWomenOne // id de celui qui a achté la montre
  }, {
    $inc: {
      "points": 5
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
  //for  id 4
  User.updateOne({
    email: req.body.emailWomenTwo // id de celui qui a achté la montre
  }, {
    $inc: {
      "points": 5
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