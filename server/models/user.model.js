const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Helper = require("../helpers/helper");


let UserModel = new Schema(
  {
   userName:{
    type:String,
    default:null,
    unique:true
   },
   password:{
    type:String,
    default:null
   },
   token:{
    type:String,
    default:null
   }
  },
  {
    timestamps: true,
  }
);
UserModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    let hashpassword = await Helper.generatePassCode(this.password);
    this.password = hashpassword;
  }
  next();
});


UserModel.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports = mongoose.model("User", UserModel);
