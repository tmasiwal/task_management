const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist");
// const User = require("../models/user"); // Import the User model or use it as appropriate

const authMiddle = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization || null;
    const refreshToken = req.headers.refreshToken || null;

    if (accessToken) {
      // Check if access token is blacklisted
      let existingToken = await blacklistModel.findOne({
        blacklist: accessToken,
      });

      if (existingToken) {
        return res.status(400).send({ error: "Please login again" });
      }

      jwt.verify(accessToken, "tanuj", (err, decoded) => {
        if (err) {
          // Access token expired
          if (err.name === "TokenExpiredError" && refreshToken) {
            jwt.verify(refreshToken, "tanuj", (err, decoded) => {
              if (err) {
                return res.status(400).send({ error: "Please login Again" });
              }

              // Refresh token is valid
              const newAccessToken = jwt.sign(
                { userId: decoded.userId, username: decoded.username },
                "tanuj",
                { expiresIn: "1d" }
              );

              // Update the request object with new token data
              req.headers.accesstoken = newAccessToken;
              req.body.userId = decoded.userId;
              req.body.username = decoded.username;

              // Continue to the next middleware
              next();
            });
          } else {
            // Invalid access token and no refresh token
            return res.status(400).send({ error: "Please login again" });
          }
        } else {
          // Access token is valid
          req.body.userId = decoded.userId;
          req.body.username = decoded.username;
          console.log("mid", decoded);

          // Continue to the next middleware
          next();
        }
      });
    } else {
      // No access token provided
      res.status(400).send("Please login first");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = authMiddle;
