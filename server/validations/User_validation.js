const { body } = require("express-validator");

class AuthValidators {
    UserRegister() {
        const fields = [
            body('userName', "Enter valid username").exists().trim().isString().notEmpty(),
            body('password', "Password must include one lowercase, uppercase, a number, and a special character.")
                .exists().trim().isString().notEmpty(),
          
        ]
        return fields;
    }
    UserLogin() {
        const fields = [
            body("userName", "enter valid  username").exists().isString().notEmpty(),
            body("password", "Password cannot be empty").exists().isString().notEmpty()
        ]
        return fields
    }


}

module.exports = new AuthValidators()