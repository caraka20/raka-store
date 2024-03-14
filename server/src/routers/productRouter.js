const router = require("express").Router();
const { productController } = require("../controllers");
const upload = require("../middleware/uploudFile");

router.post("/", upload, productController.createProduct);
router.get("/:product_id", productController.getProductById);
router.put("/status/:product_id", productController.updateStatus);
router.put("/:product_id", productController.updateProduct);
router.delete("/:product_id", productController.deleteProduct);
router.get("/", productController.getAllProduct);

module.exports = router;
