const router = require('express').Router();
const UserRoute = require("../routes/user.route")

const ProductRoute = require("../routes/product.route")

router.use('/user', UserRoute);
router.use('/product', ProductRoute);

module.exports = router;
