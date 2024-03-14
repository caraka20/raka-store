const transactionServices = require("../services/transactionServices");
const respHandler = require("../utils/respHandler");
const {
  MIDTRANS_APP_URL,
  MIDTRANS_SERVER_KEY,
  PENDING_PAYMENT,
} = require("../utils/constant");

module.exports = {
  // create transaction
  addTransaction: async (req, res, next) => {
    try {
      const { email, nama_lengkap, product_id, harga, no_wa } = req.body;
      function generateRandomString(length) {
        let result = "";
        const characters = "0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      const transaksi_uid = `TRX-${generateRandomString(5)}-${Date.now()}`;

      const authString = btoa(`${MIDTRANS_SERVER_KEY}:`);
      const payload = {
        transaction_details: {
          order_id: transaksi_uid,
          gross_amount: harga,
        },
        item_details: {
          id: product_id,
          price: harga,
          quantity: 1,
          name: "product",
        },
        customer_details: {
          nama_lengkap,
          email,
        },
      };

      // callback tapi nanti

      const response = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status !== 201) {
        return res.status(500).json({
          status: "error",
          message: "Failed to create transaction",
        });
      }

      const result = await transactionServices.addTransaction({
        email,
        nama_lengkap,
        product_id,
        transaksi_uid,
        harga,
        no_wa,
        snap_token: data.token,
        snap_redirect_url: data.redirect_url,
      });
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  // get transaction id
  getTransactionId: async (req, res, next) => {
    try {
      const { transaksi_uid } = req.query;
      console.log(transaksi_uid);
      const result = await transactionServices.getTransactionId(transaksi_uid);
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  // update transaction status
  updateTransactionStatus: async (req, res, next) => {
    try {
      const { transaction_id } = req.params;
      const { status } = req.body;
      const result = await transactionServices.updateTransactionStatus(
        transaction_id,
        status
      );
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  // update status berdasarkan respon dari midtrans

  // get all transaction
  allTransaction: async (req, res, next) => {
    try {
      const {
        email,
        nama_product,
        kategori_id,
        status,
        startDate,
        endDate,
        page,
        pageSize,
      } = req.query;
      const result = await transactionServices.allTransaction(
        email,
        nama_product,
        kategori_id,
        status,
        startDate,
        endDate,
        page,
        pageSize
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },

  reportTransaction: async (req, res, next) => {
    try {
      const result = await transactionServices.reportTransaction();
      respHandler({ res, ...result });
    } catch (error) {
      next(error);
    }
  },

  sendMail: async (req, res, next) => {
    try {
      console.log("lala");
    } catch (error) {
      next(error);
    }
  },
};
