require("dotenv/config");

module.exports = {
  PENDING_PAYMENT: "PENDING_PAYMENT",
  PAID: "PAID",
  CANCELED: "CANCELED",
  MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
  MIDTRANS_APP_URL: process.env.MIDTRANS_APP_URL,
  // export const FRONT_END_URL : process.env.FRONT_END_URL;
};
