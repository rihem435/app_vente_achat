const mongoose=require("mongoose")
const user=require("./userModel")
const livreurSchema=mongoose.Schema({
  image: {
    type: String,
    required: false,
    },
    region: {
      type: String,
      enum:["type1","type2"],
      required: false,
      },
      date_de_naissance: {
        type: String,
        required: false,
        },
        apropos: {
          type: String,
          required: false,
          },
          type_permis: {
            type: String,
            enum:["type1","type2"],
            required: false,
            },
            type_vehicule: {
              type: String,
              enum:["type1","type2"],
              required: false,
              },
              experience: {
                type: String,
                required: false,
                },
adresse: {
  type: String,
  required: false,
},
})




const livreur=user.discriminator("livreur",livreurSchema)
module.exports=mongoose.model("livreur")