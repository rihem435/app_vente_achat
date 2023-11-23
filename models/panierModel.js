const mongoose=require("mongoose")
const panierSchema=mongoose.Schema({
    
  produit_cmd: {
    type: mongoose.Schema.Types.ObjectId,
   ref:"produit",
    },
      
  qte_produit: {
    type: String
  
    },
      
  type_produit: {
    type: String,
    },
      
  image_produit: {
    type: String,
    },
  prix: {
    type: String,
   
  }
 
})

module.exports=mongoose.model("panier",panierSchema)