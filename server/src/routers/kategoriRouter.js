const router = require("express").Router();
const { kategoriController } = require("../controllers");
const upload = require("../middleware/uploudFile");

router.get("/", kategoriController.allKategori);
router.post("/", upload, kategoriController.addKategori);
router.put("/:kategori_id", kategoriController.updateKategori);
router.put("/", kategoriController.updateStatus);
router.delete("/:kategori_id", kategoriController.deleteKategori);

module.exports = router;
