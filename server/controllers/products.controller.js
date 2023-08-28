const UserModel = require("../models/user.model");
const ErrorMiddleware = require("../middlewares/errorHandler");
const { validationResult } = require('express-validator');
const Helper = require("../helpers/helper")
require("dotenv").config()
class SigninController {
  async GetAllProducts(req, res, next) {
   
    try {
      let data = await Helper.getExternal("https://dummyjson.com/products");
      if(data){

        data = data.reduce((group, product) => {
            const { category } = product;
            // console.log(category);
            if (!group.has(category)) {
              group.set(category, []);
            }
            group.get(category).push(product);
            console.log(group);
            return group;
          }, new Map())

          data = Object.fromEntries(data)
      }
      
      res.status(200).json({status:1,message:"Success",data})
    } catch (error) {
      next(new ErrorMiddleware(error.message,500,2))
    }
  }

 
}

module.exports = new SigninController();
