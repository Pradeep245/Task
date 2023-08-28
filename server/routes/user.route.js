const router = require('express').Router();
const SigninController = require("../controllers/signin.controller");
const UserValidators = require("../validations/User_validation");
const AuthMiddleware = require("../middlewares/auth.middleware");

router.route('/signup').post(UserValidators.UserRegister(), SigninController.signUp);
router.route('/signin').post(UserValidators.UserLogin(), SigninController.Signin);
router.route("/logout").get(AuthMiddleware.verifytoken,SigninController.Signout)
module.exports = router;
