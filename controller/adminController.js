const { model } = require("mongoose")
const bcrypt=require("bcrypt")
const adminModel=require("../models/adminModel")
module.exports={
  registre:async (req,res)=>{
    try{
      req.body["image"] = !req.file ? null : req.file.filename;
      const salt=bcrypt.genSalt(20);
      const hashPassword= await bcrypt.hashSync(
        req.body.password,
        parseInt(salt)
      );
      const admin=new adminModel(
        {...req.body,
      password:hashPassword
      }
      )
      console.log("----------------admin------------")
      await admin.save().then(()=>{
        res.status(200).json({
            message:'admin created',data:admin
            
        })})
      console.log('++++++++++++++++++++++++++++++')
    }catch(error){
      res.status(400).json({
        error:error.message,
        message:"admin échec",
        data:null
      })
    }},

 update : async (req,res)=>{
  try{
    req.body["image"] = !req.file ? null : req.file.filename;
    adminModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((admin)=>{
      res.status(200).json({
          message:'admin  updated',
          data:admin
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
  await  adminModel.find().then((admin)=>{
    res.status(200).json({
        message:'get all admin success',
        data:admin
    })})
} catch (error) {
  res.status(400).json({
    error:error.message
})
}},
delete : async (req,res)=>{
  try{
    adminModel.findByIdAndDelete(req.params.id).then(()=>{
      res.status(200).json({
          message:'admin  deleted',
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
    adminModel.findById(req.params.id).then((admin)=>{
      res.status(200).json({
          message:'Find admin ',data:admin
      })
  })}
  catch(error){
      res.status(400).json({
          error:error.message
      })
  }

 },
}



