const router = require("express").Router();
const { transactionController } = require("../controllers");

router.post("/", transactionController.addTransaction);
router.post("/mail", transactionController.sendMail);
router.get("/", transactionController.allTransaction);
router.get("/report", transactionController.reportTransaction);
router.get("/order-status", transactionController.getTransactionId);
router.put("/:transaction_id", transactionController.updateTransactionStatus);

module.exports = router;
