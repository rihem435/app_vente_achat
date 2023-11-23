const mongoose=require("mongoose")
const categorieSchema=mongoose.Schema({
    nom: {
        type: String,
        required: false,
        },


        image_categorie: {
            type: String,
            required: false,
            },

produits:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"produits"
}]


});


module.exports=mongoose.model("categories",categorieSchema)