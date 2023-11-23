const mongoose=require("mongoose")
const user=require("./userModel")
const acheteurSchema=mongoose.Schema({})




const acheteur=user.discriminator("acheteur",acheteurSchema)
module.exports=mongoose.model("acheteur")