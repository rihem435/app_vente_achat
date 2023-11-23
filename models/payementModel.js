const mongoose=require("mongoose")
const payementSchema=mongoose.Schema({
    
  destination: {
    type: String,
    required: false,
    },
      
  temps: {
    type: String,
    required: false,
    },
      
  image_livreur: {
    type: String,
    required: true,
    },
      
  tel_livreur: {
    type: String,
    required: true,
    },
  num_cartBank: {
  type: String,
  required: false,
  },
  date_expiration: {
    type: String,
    required: false,
    },
  cvv: {
    type: String,
    required: false,
  }
})

module.exports=mongoose.model("payement",payementSchema)