const UserModel = require("../models/user.model");
const ErrorMiddleware = require("../middlewares/errorHandler");
const { validationResult } = require('express-validator');
const Helper = require("../helpers/helper")
require("dotenv").config()
class SigninController {
  async signUp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {userName,password} = req.body;
    try {
      let UserExists = await UserModel.findOne({userName});
      if(UserExists) return next(new ErrorMiddleware("User already exists",400,2))
      let User = await new UserModel({userName,password}).save()
      const token = await Helper.generateJwt(process.env.USER_SECRET, {id: User._id});
      User.token = token
      User = await User.save()
      res.status(200).json({
        message: "User created Successfully",
        status:1,
        data: { token: token ,userName:User.userName } ,
      });
    } catch (error) {
      next(new ErrorMiddleware(error.message,500,2))
    }
  }

  async Signin(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: JSON.stringify(errors.array()) });
    }
    let {userName,password} = req.body;
    try {
      let User = await UserModel.findOne({ userName});
      if (!User) return next(new ErrorMiddleware("User not found",400,2))
      let PasswordMatch = await Helper.comparePassCode(User.password, password);
      if (!PasswordMatch) return next(new ErrorMiddleware("Invalid login details",403,2))
  
      const token = await Helper.generateJwt(process.env.USER_SECRET, {id: User._id});
      User.token = token
      User = await User.save()
      res.status(200).json({
        message: "User Login Successfully",
        status:1,
        data: { token: token ,userName:User.userName } ,
      });
    } catch (error) {
      return next(new ErrorMiddleware(error.message,500,2))
    }
  }
  async Signout(req,res,next){
    let id = req.user;
    try {
      let User = await UserModel.findById(id);
      User.token = null;
      User = await User.save();
      res.status(200).json({status:1,message:"User Logout Successfully"})
    } catch (error) {
      next(new ErrorMiddleware(error.message,500,2))

    }
  }
}

module.exports = new SigninController();
