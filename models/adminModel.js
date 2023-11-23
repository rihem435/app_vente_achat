const mongoose=require("mongoose")
const user=require("./userModel")
const adminSchema=mongoose.Schema({
    image: {
        type: String,
        required: false,
        }
})




const admin=user.discriminator("admin",adminSchema)
module.exports=mongoose.model("admin")