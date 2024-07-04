const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const StaffController = require("../controllers/staffController");
const OrderController = require("../controllers/orderController");
const authentication = require("../middleware/auth");

router.post("/user/register", UserController.register);
router.post("/user/login", UserController.login);

router.post("/staff/register", StaffController.register);
router.post("/staff/login", StaffController.login);

router.post("/order/create", authentication, OrderController.create);
router.get("/order/get", authentication, OrderController.get);
router.put("/order/update", authentication, OrderController.update);

module.exports = router;