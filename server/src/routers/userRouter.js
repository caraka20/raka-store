const router = require("express").Router()
const {userController} = require("../controllers")
const {ownerMiddleware} = require("../middleware/ownerMiddleware")

router.post("/register", userController.registerUser)
router.get("/", userController.allUser)
router.get("/login", userController.loginUser)
router.put("/:user_id",ownerMiddleware, userController.updateRoleUser)

module.exports = router