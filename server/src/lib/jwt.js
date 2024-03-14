const jwt = require("jsonwebtoken");

module.exports = {
  createJWT: (payload) => {
    try {
      return jwt.sign(payload, "abc123", {
        expiresIn: "5h",
      });
    } catch (error) {
      return error;
    }
  },

  verify: (token) => {
    const isVerified = jwt.verify(token, "abc123");
    return isVerified;
  },
};
