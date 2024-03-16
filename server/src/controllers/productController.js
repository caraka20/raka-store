const productServices = require("../services/productServices");
const respHandler = require("../utils/respHandler");

module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const data = JSON.parse(req.body.data);
      const path = req.files.files[0].path;
      // console.log(req.files);
      let image_product = "";
      if (req.files.images) {
        image_product = req.files.images[0].path;
      }
      console.log(data);

      if (parseInt(data.harga) < 5000) {
        throw { isError: true, message: "harga harus diatas 5rb" };
      }
      const result = await productServices.createProduct(
        data,
        path,
        image_product
      );
      respHandler({ res, ...result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const { product_id } = { ...req.params };
      const result = await productServices.updateStatus(product_id);
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const data = { ...req.body };
      const { product_id } = req.params;
      const result = await productServices.updateProduct(data, product_id);
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const result = await productServices.deleteProduct(product_id);
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  getAllProduct: async (req, res, next) => {
    try {
      const { kategori, search, sortBy, status, page, pageSize } = req.query;
      const result = await productServices.allProduct({
        kategori,
        search,
        sortBy,
        status,
        page,
        pageSize,
      });
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const result = await productServices.getProductId(product_id);
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },
};
