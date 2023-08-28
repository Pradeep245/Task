const router = require('express').Router();
const ProductsController = require("../controllers/products.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

router.route("/").get(AuthMiddleware.verifytoken,ProductsController.GetAllProducts)
module.exports = router;
