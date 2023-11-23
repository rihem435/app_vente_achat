const mongoose=require("mongoose")
const validationSchema=mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        },
        commande: {
            type: mongoose.Schema.Types.ObjectId,
           ref:"commandes",
          },

          livreur: {
            type: mongoose.Schema.Types.ObjectId,
           ref:"livreur",
          }
})

module.exports=mongoose.model("validation",validationSchema)