const { deleteFiles } = require("../helper/deleteFile");
const db = require("./../models");
const { sequelize } = require("./../models");

module.exports = {
  allProduct: async ({ kategori, search, sortBy, status, page, pageSize }) => {
    try {
      let order = [];
      if (sortBy === "a-z") {
        order.push(["nama_product", "ASC"]);
      } else if (sortBy === "z-a") {
        order.push(["nama_product", "DESC"]);
      }

      const where = {};

      if (search) {
        where.nama_product = {
          [db.Sequelize.Op.like]: `%${search}%`,
        };
      }

      if (status) {
        where.status = status;
      }

      if (kategori) {
        const dataKategori = await db.kategori.findOne({
          where: { nama_kategori: kategori },
        });

        if (dataKategori) {
          where.kategori_id = dataKategori.id;
        }
      }

      const offset = Number((page - 1) * pageSize);
      const limit = Number(pageSize);

      const allProduct = await db.product.findAndCountAll({
        attributes: [
          "id",
          "harga",
          "nama_product",
          "description",
          "kategori_id",
          "status",
          "image_product",
          [db.Sequelize.col("kategori.nama_kategori"), "nama_kategori"],
          [db.Sequelize.col("kategori.kategori_image"), "kategori_image"],
        ],
        where,
        include: [
          {
            model: db.kategori,
            attributes: [],
          },
        ],
        order,
        offset,
        limit,
      });

      const totalItems = allProduct.count;
      const totalPages = Math.ceil(totalItems / pageSize);

      // Validasi untuk halaman yang tidak valid
      if (page < 1 || page > totalPages) {
        throw new Error("Halaman tidak valid");
      }

      return {
        message: "Data Berhasil Diambil",
        totalPages,
        totalItems,
        data: allProduct.rows,
      };
    } catch (error) {
      return error;
    }
  },

  createProduct: async (
    { nama_product, description, harga, kategori_id },
    path,
    image_product
  ) => {
    try {
      await db.product.create({
        nama_product,
        description,
        harga: harga,
        kategori_id,
        status: "active",
        file: path,
        image_product,
      });
      return { message: "Add Product success" };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  updateStatus: async (product_id) => {
    try {
      const dataProduct = await db.product.findByPk(product_id);
      const data = {};
      if (dataProduct.dataValues.status === "active") {
        data["status"] = "inactive";
      } else {
        data["status"] = "active";
      }
      await db.product.update(
        { status: data.status },
        { where: { id: product_id } }
      );
      return { message: `update status menjadi ${data.status} success` };
    } catch (error) {
      return error;
    }
  },
  updateProduct: async (data, product_id) => {
    try {
      const dataProduct = await db.product.findByPk(product_id);
      const updateProduct = await db.product.update(
        { ...dataProduct.dataValues, ...data },
        { where: { id: Number(product_id) } }
      );
      return { message: "Update Product Success" };
    } catch (error) {
      return error;
    }
  },
  deleteProduct: async (product_id) => {
    try {
      const dataProduct = await db.product.findByPk(product_id);
      if (!dataProduct) {
        return {
          isError: true,
          status: 409,
          message: "Product Not Found",
        };
      }
      const deleteProduct = await db.product.destroy({
        where: { id: product_id },
      });
      deleteFiles(dataProduct.dataValues.image_product);
      deleteFiles(dataProduct.dataValues.file);
      return { message: "Delete Product Has Been Success" };
    } catch (error) {
      return error;
    }
  },

  getProductId: async (product_id) => {
    try {
      const data = await db.product.findByPk(product_id);
      return { message: "Succes Get Detail Product", data };
    } catch (error) {
      return error;
    }
  },
};
