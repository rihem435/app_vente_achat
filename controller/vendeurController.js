const { model } = require("mongoose")
const bcrypt=require("bcrypt")
const vendeurModel=require("../models/vendeurModel")
module.exports={
  registre:async (req,res)=>{
    try{
      req.body["image"] = !req.file ? null : req.file.filename;
      const salt=bcrypt.genSalt(20);
      const hashPassword= await bcrypt.hashSync(
        req.body.password,
        parseInt(salt)
      );
      const vendeur=new vendeurModel(
        {...req.body,
      password:hashPassword
      }
      )
      console.log("----------------acheteur------------")
      await vendeur.save().then(()=>{
        res.status(200).json({
            message:'vendeur created',data:vendeur
            
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
    vendeurModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((vendeur)=>{
      res.status(200).json({
          message:'vendeur  updated',
          data:vendeur
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
  await  vendeurModel.find().then((vendeur)=>{
    res.status(200).json({
        message:'get all vendeur success',
        data:vendeur
    })})
} catch (error) {
  res.status(400).json({
    error:error.message
})
}},
delete : async (req,res)=>{
  try{
    vendeurModel.findByIdAndDelete(req.params.id).then(()=>{
      res.status(200).json({
          message:'vendeur  deleted',
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
    vendeurModel.findById(req.params.id).then((vendeur)=>{
      res.status(200).json({
          message:'Find seller ',data:vendeur
      })
  })}
  catch(error){
      res.status(400).json({
          error:error.message
      })
  }

 },
}



