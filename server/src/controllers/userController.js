const { hash } = require("../helper/hashing");
const userServices = require("../services/userServices");
const respHandler = require("../utils/respHandler");

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const { nama_user, email_user, password } = req.body;
      const hasilHash = await hash(password);
      const result = await userServices.registerUser(
        nama_user,
        email_user,
        hasilHash
      );
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { email_user, password } = req.query;
      const result = await userServices.loginUser(email_user, password);
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  updateRoleUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const { role } = req.body;
      const result = await userServices.updateRoleUser(user_id, role);
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  allUser: async (req, res, next) => {
    try {
      const result = await userServices.allUser();
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },
};
