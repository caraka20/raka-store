const jwt = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET_KEY;
const { verify } = require("../lib/jwt");
const db = require("../models");

module.exports = {
  ownerMiddleware: async (req, res, next) => {
    const token = req.token;
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .send({ message: "Tidak ada token, akses ditolak" });
    }
    try {
      const decoded = verify(token);
      const data = await db.user.findByPk(decoded.id);
      if (data.dataValues.role !== "owner") {
        return res
          .status(403)
          .send({ message: "Hanya Owner yang diizinkan mengakses" });
      }
      req.user = decoded.user;
      next();
    } catch (e) {
      if (e.message === "jwt expired") {
        return res.status(419).send({ message: "Token Expired" });
      }
      return res.status(401).send({ message: e.message });
    }
  },
};

// module.exports = adminMiddleware;
