const mongoose=require("mongoose")
const user=require("./userModel")
const vendeurSchema=mongoose.Schema({
  image: {
    type: String,
    required: false,
    },
  adresse: {
  type: String,
  required: false,
},
})




const vendeur=user.discriminator("vendeur",vendeurSchema)
module.exports=mongoose.model("vendeur")