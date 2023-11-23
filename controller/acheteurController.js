const { model } = require("mongoose")
const bcrypt=require("bcrypt")
const acheteurModel=require("../models/acheteurModel")
module.exports={
  registre:async (req,res)=>{
    try{
      const salt=bcrypt.genSalt(20);
      const hashPassword= await bcrypt.hashSync(
        req.body.password,
        parseInt(salt)
      );
      const acheteur=new acheteurModel(
        {...req.body,
      password:hashPassword
      }
      )
      console.log("----------------acheteur------------")
      await acheteur.save().then(async ()=>{
        res.status(200).json({
            message:'acheteur created',data:acheteur
            
        })})
      console.log('++++++++++++++++++++++++++++++')
    }catch(error){
      res.status(400).json({
        message:"acheteur échec",
        data:null
      })
    }},

 update : async (req,res)=>{
  try{
    acheteurModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((acheteur)=>{
      res.status(200).json({
          message:'acheteur  updated',
          data:acheteur
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
  await  acheteurModel.find().then((acheteur)=>{
    res.status(200).json({
        message:'get all acheteurs success',
        data:acheteur
    })})
} catch (error) {
  res.status(400).json({
    error:error.message
})
}},
delete : async (req,res)=>{
  try{
    acheteurModel.findByIdAndDelete(req.params.id).then(()=>{
      res.status(200).json({
          message:'acheteur  deleted',
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
    acheteurModel.findById(req.params.id).then((acheteur)=>{
      res.status(200).json({
          message:'Find acheteur ',data:acheteur
      })
  })}
  catch(error){
      res.status(400).json({
          error:error.message
      })
  }

 },
}



