const mongoose=require("mongoose")
const produitSchema=mongoose.Schema({
    
  nom: {
    type: String,
    required: false,
    },
      
  description: {
    type: String,
    required: false,
    },
      
  image: {
    type: String,
    required: false,
    },
      
  type: {
    type: String,
    enum:["type1","type2"],
    required: false,
    },
  prix: {
  type: String,
  required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
   ref:"user",
  }, 
  panier: {
    type: mongoose.Schema.Types.ObjectId,
   ref:"panier",
  },
  magasine: {
    type: mongoose.Schema.Types.ObjectId,
   ref:"magasines",
  },
  conteur:{
   type:Number,
required:false,
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
   ref:"categories",
  },
  commande:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"commandes",
   }
  
})

module.exports=mongoose.model("produit",produitSchema)