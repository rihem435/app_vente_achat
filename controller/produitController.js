const { model } = require("mongoose");
const userModel=require("../models/userModel")
const categorieModel=require("../models/categorieModel")
const bcrypt = require("bcrypt");
const produitModel = require("../models/produitModel");

module.exports = {
  create: async (req, res) => {
    try {
      req.body["image"] = !req.file ? null : req.file.filename;

      const produit = new produitModel(
        req.body
      );

      console.log("----------------produit------------");

      await produit.save().then(() => {
        res.status(200).json({
          message: 'produit created',
          data: produit,
        });
      });
    await userModel.findByIdAndUpdate(req.body.user,{$push:{produits:produit}})
    await categorieModel.findByIdAndUpdate(req.body.categorie,{$push:{produits:produit}})

      console.log('++++++++++++++++++++++++++++++');
    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: "produit échec",
        data: null,
      });
    }
  },

 update : async (req,res)=>{
  try{
  if(req.file != null){
    req.body["image"] =  req.file.filename;

  }
    produitModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((produit)=>{
      res.status(200).json({
          message:'produit updated',
          data:produit
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
  await  produitModel.find().then((produit)=>{
    res.status(200).json({
        message:'get all produit success',
        data:produit
    })})
} catch (error) {
  res.status(400).json({
    error:error.message
})
}},
delete : async (req,res)=>{
  try{
    produitModel.findByIdAndDelete(req.params.id).then(()=>{
      res.status(200).json({
          message:'produit  deleted',
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
    produitModel.findById(req.params.id).then((produit)=>{
      res.status(200).json({
          message:'Find produit ',data:produit
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
    produitModel.find({nom:req.query.nom}).then((produit)=>{
      res.status(200).json({
          message:'Find produit ',data:produit
      })
  })}
  catch(error){
      res.status(400).json({
          error:error.message
      })
  }
}
 }



