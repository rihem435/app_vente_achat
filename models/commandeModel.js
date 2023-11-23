const mongoose=require("mongoose")
const commandeSchema=mongoose.Schema({
    num_cmd: {
        type: String,
        required: false,
        },
       total_price: {
            type: String,
            required: false,
            },
            adresse_acheteur: {
                type: String,
                required: false,
                },
                methode_pay: {
                    type: String,
                    enum:["type1","type2"],
                    required: false,
                    },
            date: {
                type: Date,
                default: Date.now,
                },
               liste_produit: [{
                    type: mongoose.Schema.Types.ObjectId,
                   ref:"produit",
                    }],
                acheteur: {
                    type: mongoose.Schema.Types.ObjectId,
                   ref:"acheteur",
                  }
})

module.exports=mongoose.model("commandes",commandeSchema)