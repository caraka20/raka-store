const { deleteFiles } = require("../helper/deleteFile");
const db = require("../models");

module.exports = {
  allKategori: async (status) => {
    try {
      where = {};
      if (status) where.status = status;
      const dataKategori = await db.kategori.findAll({ where });
      return { message: "Data Success", data: dataKategori };
    } catch (error) {
      return error;
    }
  },

  addKategori: async ({ nama_kategori, path }) => {
    try {
      const data = db.kategori.create({
        nama_kategori,
        kategori_image: path,
        status: "active",
      });
      return { message: "Success Create Kategori" };
    } catch (error) {
      return error;
    }
  },

  updateKategori: async ({ kategori_id, nama_kategori, status }) => {
    try {
      const updateKategori = await db.kategori.update(
        { nama_kategori },
        { where: { id: kategori_id } }
      );
      return { message: "Berhasil Update" };
    } catch (error) {
      return error;
    }
  },

  updateStatus: async (kategori_id) => {
    try {
      const dataKategori = await db.kategori.findByPk(kategori_id);
      const data = {};
      if (dataKategori.dataValues.status === "active") {
        data["status"] = "inactive";
      } else {
        data["status"] = "active";
      }
      await db.kategori.update(
        { status: data.status },
        { where: { id: kategori_id } }
      );
      return { message: `update status menjadi ${data.status} success` };
    } catch (error) {
      return error;
    }
  },

  deleteKategori: async (kategori_id) => {
    try {
      const dataKategori = await db.kategori.findByPk(kategori_id);
      if (!dataKategori) {
        return {
          isError: true,
          status: 409,
          message: "Kategori Not Found",
        };
      }
      const deleteKategori = await db.kategori.destroy({
        where: { id: kategori_id },
      });

      deleteFiles(dataKategori.dataValues.kategori_image);
      return { message: "Delete Kategori Has Been Success" };
    } catch (error) {
      return error;
    }
  },
};
