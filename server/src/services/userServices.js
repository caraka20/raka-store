const db = require("../models");
const { createJWT } = require("../lib/jwt");
const { match } = require("../helper/hashing");

module.exports = {
  registerUser: async (nama_user, email_user, hasilHash) => {
    try {
      const existingUser = await db.user.findOne({
        where: { email_user },
      });

      if (existingUser) {
        return { isError: true, status: 409, message: "Email sudah digunakan" };
      }

      const register = await db.user.create({
        nama_user,
        email_user,
        password: hasilHash,
        role: "customer",
      });

      return { message: "Register Success", data: register.dataValues };
    } catch (error) {
      return error;
    }
  },

  loginUser: async (email_user, password) => {
    try {
      const dataUser = await db.user.findOne({ where: { email_user } });
      if (!dataUser) {
        return {
          isError: true,
          status: 409,
          message: "Username tidak ditemukan",
        };
      }

      if (!(await match(password, dataUser.dataValues.password))) {
        return {
          isError: true,
          status: 409,
          message: "Password salah",
        };
      }
      const jwt = await createJWT({ id: dataUser.dataValues.id });
      const role = dataUser.dataValues.role;
      return { message: "Login Success", data: { jwt, role } };
    } catch (error) {
      return error;
    }
  },

  updateRoleUser: async (user_id, role) => {
    try {
      const updateRole = await db.user.update(
        { role },
        { where: { id: user_id } }
      );
      return { message: `Success Update Role Menjadi ${role}` };
    } catch (error) {
      return error;
    }
  },

  allUser: async () => {
    try {
      const data = await db.user.findAll();
      return { message: "success", data };
    } catch (error) {
      return error;
    }
  },
};
