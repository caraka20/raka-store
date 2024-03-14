const jwt = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET_KEY;
const { verify } = require("../lib/jwt");
const db = require("../models");

module.exports = {
  adminMiddleware: async (req, res, next) => {
    const token = req.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Tidak ada token, akses ditolak" });
    }

    try {
      const decoded = verify(token);
      const data = await db.user.findByPk(decoded.id);
      if (
        data.dataValues.role !== "owner" ||
        data.dataValues.role !== "admin"
      ) {
        return res
          .status(403)
          .json({ message: "Hanya Owner yang diizinkan mengakses" });
      }
      req.user = decoded.user;
      next();
    } catch (e) {
      res.status(500).json({ msg: "Token tidak valid" });
    }
  },
};
