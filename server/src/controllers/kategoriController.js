const respHandler = require("../utils/respHandler");
const kategoriServices = require("../services/kategoriServices");

module.exports = {
  allKategori: async (req, res, next) => {
    try {
      const { status } = req.query;
      const result = await kategoriServices.allKategori(status);
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  addKategori: async (req, res, next) => {
    try {
      const { nama_kategori } = JSON.parse(req.body.data);
      // console.log(nama_kategori);
      const path = req.files.images[0].path;
      const result = await kategoriServices.addKategori({
        nama_kategori,
        path,
      });
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  updateKategori: async (req, res, next) => {
    try {
      const { kategori_id } = req.params;
      const { nama_kategori } = req.body;
      const result = await kategoriServices.updateKategori({
        kategori_id,
        nama_kategori,
      });
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const { kategori_id } = req.query;
      const result = await kategoriServices.updateStatus(kategori_id);
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  deleteKategori: async (req, res, next) => {
    try {
      const { kategori_id } = req.params;
      const result = await kategoriServices.deleteKategori(kategori_id);
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },
};
