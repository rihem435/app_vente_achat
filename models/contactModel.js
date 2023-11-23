const mongoose=require("mongoose")
const contactSchema=mongoose.Schema({
    message: {
        type: String,
        required: false,
        },
        date: {
            type: Date,
            default: Date.now,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
               ref:"user",
              }
})

module.exports=mongoose.model("contact",contactSchema)