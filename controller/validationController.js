const validationModel = require("../models/validationModel");
const acheteurModel=require("../models/acheteurModel");
const commandeModel = require("../models/commandeModel");
const produitModel = require("../models/produitModel");
const livreurModel=require("../models/livreurModel")
module.exports = {
  create: async (req, res) => {
    try {
      const validation = new validationModel(req.body);
      await validation.save().then((validation) => {
      for(var i=0;i<validation.commande.liste_produit.length;i++){
        produitModel.findById(validation.commande.liste_produit[i]).then((produit)=>{
          console.log("success")
          console.log(produit)
         })
      }
       
        res.status(200).json({
          message: 'validation created',
          data: validation,
        });
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: "validation échec",
        data: null,
      });
    }
  },

  delete: async (req, res) => {
    try {
      validationModel.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({
          message: 'validation  deleted',
        });
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },




  getAll: async (req, res) => {
    try {
      await validationModel.find().then((validation) => {
        res.status(200).json({
          message: 'get all validation success',
          data: validation,
        });
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },


  
}
