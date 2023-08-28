const Helper = require("../helpers/helper");
require("dotenv").config();

class jwttokenMiddleware {
  async verifytoken(req, res, next) {
    try {
      const bearerHeader = req.headers["authorization"];
      if (!bearerHeader)
        return res
          .status(403)
          .json({ message: "Failed", data: "Access Permissions Denied" });

      const bearerToken = bearerHeader.split(" ")[1];
      if (
        bearerToken == "null" ||
        bearerToken == "undefined" ||
        (bearerToken == null && bearerToken == undefined) ||
        bearerToken.length < 15
      ) {
        return res
          .status(403)
          .json({
            message: "Failed",
            data: "You haven't logged in. Please login",
          });
      }
      let data = await Helper.verifyJwt(process.env.USER_SECRET, bearerToken);
      

      if(!data) return res.status(403).json({
        message: "Failed",
        data: "You haven't logged in. Please login",
      });
        req.user = data.id
         next()
      
      
    } catch (error) {
      return res.status(400).json({ message: "Failed", data: error.message });
    }
  }
}

module.exports = new jwttokenMiddleware();
