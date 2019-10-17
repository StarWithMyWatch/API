const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("authorization: ");
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "SE56AR4T98ER49TGR495H8G4F98H584ZH5E6R");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated!",

    });
  }
};
