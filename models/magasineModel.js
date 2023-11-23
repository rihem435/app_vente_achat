const mongoose=require("mongoose")
const magasineSchema=mongoose.Schema({
    
  nom_magasine: {
    type: String,
    required: false,
    },
      
    image_magasine: {
    type: String,
    required: false,
    },

    image_produit: {
        type: String,
        required: false,
        },

       
    time: {
        type: String,
        required: false,
        },
      
        adresse_magasine: {
            type: String,
            required: false,
            },
      
            
  type: {
    type: String,
    enum:["type1","type2"],
    required: false,
    },
 
    vendeur: {
    type: mongoose.Schema.Types.ObjectId,
   ref:"vendeur",
  }, 
  produits: {
    type: mongoose.Schema.Types.ObjectId,
   ref:"produit",
  }

})

module.exports=mongoose.model("magasine",magasineSchema)