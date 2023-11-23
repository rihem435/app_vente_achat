const mongoose=require("mongoose")
const  user=require("./userModel")

const ratingSchema=mongoose.Schema({


state:{
    type: String,
    enum:["triste","neutre","heureux"],
    required: false,
},

commentaire:{
    type: String,
    required: false,
},

user: {
    type: mongoose.Schema.Types.ObjectId,
   ref:"user",
  }
})

module.exports=mongoose.model("rating",ratingSchema)





