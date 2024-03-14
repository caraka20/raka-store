const db = require("../models");
const transporter = require("../helper/transporter");

module.exports = {
  addTransaction: async ({
    email,
    nama_lengkap,
    product_id,
    transaksi_uid,
    harga,
    no_wa,
    snap_token,
    snap_redirect_url,
  }) => {
    try {
      const dataProduct = await db.product.findByPk(product_id);
      if (dataProduct === null) {
        return {
          isError: true,
          status: 409,
          message: "Product Not Found",
        };
      }
      const data = await db.transaction.create({
        email,
        nama_lengkap,
        product_id,
        transaksi_uid,
        harga,
        no_wa,
        status: "MENUNGGU PEMBAYARAN",
      });
      return {
        message: "success add transaction",
        data: { ...data.dataValues, snap_token, snap_redirect_url },
      };
    } catch (error) {
      return error;
    }
  },

  getTransactionId: async (transaksi_uid) => {
    try {
      const dataTransaction = await db.transaction.findOne({
        where: { transaksi_uid },
        include: [
          {
            model: db.product,
            as: "product", // Sesuaikan dengan nama relasi yang telah Anda definisikan di model
            include: [
              {
                model: db.kategori,
                attributes: ["id", "nama_kategori"],
              },
            ],
          },
        ],
      });
      if (dataTransaction === null) {
        return {
          isError: true,
          status: 409,
          message: "Transaction Not Found",
        };
      }
      return { message: "success get transaction", data: [dataTransaction] };
    } catch (error) {
      return error;
    }
  },

  updateTransactionStatus: async (transaction_id, status) => {
    try {
      const dataTransaction = await db.transaction.findByPk(transaction_id);
      const dataProduct = await db.product.findByPk(
        dataTransaction.dataValues.product_id
      );
      console.log(dataProduct.dataValues.file);
      console.log(dataTransaction.dataValues.email);

      // await transporter.sendMail({
      //   // from: "carakawijaya20@gmail.com",
      //   to: ["carakawijaya20@gmail.com", "carakawijaya2001@gmail.com"],
      //   subject: "Register New Account",
      //   html: "<b>lala</b>",
      // });

      if (dataTransaction === null) {
        return {
          isError: true,
          status: 409,
          message: "Transaction Not Found",
        };
      }
      const data = await db.transaction.update(
        { status },
        { where: { id: transaction_id } }
      );
      return { message: `success update status ${status}`, data: null };
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  allTransaction: async (
    email,
    nama_product,
    kategori_id,
    status,
    startDate,
    endDate,
    page,
    pageSize
  ) => {
    try {
      const whereTransaction = {};
      if (status) whereTransaction.status = status;
      if (email) {
        whereTransaction.email = {
          [db.Sequelize.Op.like]: `%${email}%`,
        };
      }
      // Menambahkan filter berdasarkan rentang tanggal pembuatan (createdAt)
      if (startDate && endDate) {
        whereTransaction.createdAt = {
          [db.Sequelize.Op.between]: [startDate, endDate],
        };
      }

      const includeProduct = {
        model: db.product,
        attributes: [
          "nama_product",
          "id",
          "harga",
          "status",
          "file",
          "image_product",
        ],
        include: [
          {
            model: db.kategori,
            attributes: ["id", "nama_kategori"],
          },
        ],
      };

      if (kategori_id || nama_product) {
        includeProduct.where = {};
        if (kategori_id) includeProduct.where.kategori_id = kategori_id;
        if (nama_product) includeProduct.where.nama_product = nama_product;
      }

      // Hitung offset berdasarkan halaman dan ukuran halaman
      const offset = Number((page - 1) * Number(pageSize));

      // Panggil fungsi findAll dengan paginasi
      const data = await db.transaction.findAndCountAll({
        where: whereTransaction,
        include: [includeProduct],
        offset,
        limit: Number(pageSize),
      });
      const totalItems = data.count;
      const totalPages = Math.ceil(totalItems / pageSize);

      // Validasi untuk halaman yang tidak valid
      if (page < 1 || page > totalPages) {
        throw new Error("Halaman tidak valid");
      }
      return {
        message: "Data Berhasil Diambil",
        totalPages,
        totalItems,
        data: data.rows,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  reportTransaction: async () => {
    try {
      const respon = await db.transaction.findAll();
      // Mencari jumlah produk terjual (total data yang memiliki status pembayaran selesai)
      const productTerjual = respon.filter(
        (item) => item.status === "PEMBAYARAN SELESAI"
      ).length;

      // Mencari total pendapatan (total harga yang memiliki status pembayaran selesai)
      const pendapatan = respon.reduce((total, item) => {
        if (item.status === "PEMBAYARAN SELESAI" && item.harga) {
          return total + item.harga;
        }
        return total;
      }, 0);

      // Mencari jumlah data yang masih menunggu pembayaran
      const menungguPembayaran = respon.filter(
        (item) => item.status === "MENUNGGU PEMBAYARAN"
      ).length;
      return {
        message: "berhasil dapatkan data",
        data: { productTerjual, pendapatan, menungguPembayaran },
      };
    } catch (error) {
      return error;
    }
  },
};
