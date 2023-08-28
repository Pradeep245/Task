let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let axios = require("axios");


require("dotenv").config();
class Helper {
  async generatePassCode(password) {
    let passCode = await bcrypt.hashSync(password, parseInt(process.env.SALT));
    return passCode;
  }
  async comparePassCode(hash, password) {
    let passCode = await bcrypt.compareSync(password, hash);
    return passCode;
  }
  async generateJwt(secret, data) {
    let token = await jwt.sign(data, secret, { expiresIn: "1d" });
    return token;
  }
  async verifyJwt(secret, token) {
    try {
      let verify = await jwt.verify(token, secret);
      return verify;
    } catch (error) {
      return error.message;
    }
  }

  async getExternal(url){
    try {
            let {data} = await axios.get(url);
            return data.products || []
    } catch (error) {
        return error.message
    }
  }
}

module.exports = new Helper();
