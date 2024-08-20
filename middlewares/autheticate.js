const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log({ token });
    if (!token) {
      return res.status(401).send("no token provided");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };
