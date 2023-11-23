const { model } = require("mongoose")
const bcrypt=require("bcrypt")
const livreurModel=require("../models/livreurModel")
module.exports={
  registre:async (req,res)=>{
    try{
      req.body["image"] = !req.file ? null : req.file.filename;
      const salt=bcrypt.genSalt(20);
      const hashPassword= await bcrypt.hashSync(
        req.body.password,
        parseInt(salt)
      );
      const livreur=new livreurModel(
        {...req.body,
      password:hashPassword
      }
      )
      console.log("----------------livreur------------")
      await livreur.save().then(()=>{
        res.status(200).json({
            message:'vendeur created',data:livreur
            
        })})
      console.log('++++++++++++++++++++++++++++++')
    }catch(error){
      res.status(400).json({
        error:error.message,
        message:"vendeur échec",
        data:null
      })
    }},

 update : async (req,res)=>{
  try{
    req.body["image"] = !req.file ? null : req.file.filename;
    livreurModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((livreur)=>{
      res.status(200).json({
          message:'livreur  updated',
          data:livreur
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
  await  livreurModel.find().then((livreur)=>{
    res.status(200).json({
        message:'get all livreur success',
        data:livreur
    })})
} catch (error) {
  res.status(400).json({
    error:error.message
})
}},
delete : async (req,res)=>{
  try{
    livreurModel.findByIdAndDelete(req.params.id).then(()=>{
      res.status(200).json({
          message:'livreur  deleted',
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
    livreurModel.findById(req.params.id).then((livreur)=>{
      res.status(200).json({
          message:'Find delivery ',data:livreur
      })
  })}
  catch(error){
      res.status(400).json({
          error:error.message
      })
  }

 },
}



