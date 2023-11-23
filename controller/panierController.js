const { model } = require("mongoose");
const produitModel=require("../models/produitModel")
const bcrypt = require("bcrypt");
const panierModel = require("../models/panierModel");

module.exports = {
  create: async (req, res) => {
    try {
      req.body["image_produit"] = !req.file ? null : req.file.filename;

      const panier = new panierModel(
        req.body
      );

      console.log("----------------panier------------");
      await panier.save().then(() => {
        res.status(200).json({
          message: 'panier created',
          data: panier,
        });
      });
    await produitModel.findByIdAndUpdate(req.body.produit_cmd,{$push:{panier:panier}})

      console.log('++++++++++++++++++++++++++++++');
    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: "panier échec",
        data: null,
      });
    }
  },

 update : async (req,res)=>{
  try{
    req.body["image"] = !req.file ? null : req.file.filename;
    panierModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((panier)=>{
      res.status(200).json({
          message:'panier updated',
          data:panier
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
  await  panierModel.find().populate('produit_cmd').then((panier)=>{
    res.status(200).json({
        message:'get all panier success',
        data:panier
    })})
} catch (error) {
  res.status(400).json({
    error:error.message
})
}},
delete : async (req,res)=>{
  try{
    panierModel.findByIdAndDelete(req.params.id).then(()=>{
      res.status(200).json({
          message:'panier  deleted',
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
    panierModel.findById(req.params.id).then((panier)=>{
      res.status(200).json({
          message:'Find panier ',data:panier
      })
  })}
  catch(error){
      res.status(400).json({
          error:error.message
      })
  }

 },
 }