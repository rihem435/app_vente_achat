const { model } = require("mongoose");
const produitModel = require("../models/produitModel");
const bcrypt = require("bcrypt");
const magasineModel=require("../models/magasineModel")

module.exports = {
  create: async (req, res) => {
    try {
    
if(req.files){
  req.body["image_magasine"]= req.files.image_magasine[0].filename ;
  req.body["image_produit"] = req.files.image_produit[0].filename ;
}
      const magasine = new magasineModel(
        req.body
    );

      
      
      console.log("----------------magasine------------");

      await magasine.save().then(() => {
        res.status(200).json({
          message: 'magasine created',
          data: magasine,
        });
      });
    await produitModel.findByIdAndUpdate(req.body.produits,{$push:{magasine:magasine}})

      console.log('++++++++++++++++++++++++++++++');
    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: "magasine échec",
        data: null,
      });
    }
  },

 update : async (req,res)=>{
  try{
    if (req.files.image_magasine!= null){
    req.body["image_magasine"]= req.files.image_magasine[0].filename ;
    }

    if (req.files.image_produit!= null){
    req.body["image_produit"] = req.files.image_produit[0].filename ;
    }
    magasineModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((magasine)=>{
      res.status(200).json({
          message:'magasine updated',
          data:magasine
      })
  })}
  catch(error){
      res.status(400).json({
          error:error.message
      })
  }
 },
getAll :async (req,res)=>{
try {
  await  magasineModel.find().then((magasine)=>{
    res.status(200).json({
        message:'get all magasine success',
        data:magasine
    })})
} catch (error) {
  res.status(400).json({
    error:error.message
})
}},
delete : async (req,res)=>{
  try{
    magasineModel.findByIdAndDelete(req.params.id).then(()=>{
      res.status(200).json({
          message:'magasine  deleted',
      })
  })}
  catch(error){
      res.status(400).json({
          error:error.message
      })
      
  }

 },
 getById : async (req,res)=>{
  try{
    magasineModel.findById(req.params.id).then((magasine)=>{
      res.status(200).json({
          message:'Find magasine ',data:magasine
      })
  })}
  catch(error){
      res.status(400).json({
          error:error.message
      })
  }

 },
 getByName: async (req,res)=>{
  try{
    magasineModel.find({nom:req.query.nom}).then((magasine)=>{
      res.status(200).json({
          message:'Find magasine ',data:magasine
      })
  })}
  catch(error){
      res.status(400).json({
          error:error.message
      })
  }
}
 }