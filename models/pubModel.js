const mongoose=require("mongoose")
const pubSchema=mongoose.Schema({
titre_pub: {
    type: String,
    required: false,
    },
    text_pub: {
        type: String,
        required: false,
        },
image_pub: {
    type: String,
    required: false,
    }
})

module.exports=mongoose.model("pub",pubSchema)