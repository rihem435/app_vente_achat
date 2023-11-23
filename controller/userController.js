var admin =require ("firebase-admin");
const userModel=require("../models/userModel")
var privateKey=require ("../privateKey.json")

admin.initializeApp({
    credential:admin.credential.cert(privateKey)
})
 module.exports={
   pushNotification:async(req,res)=>{
try{
let message ={
    notification:{
        title:req.body.title,
        body:req.body.contenue,
    },
    token:req.body.token
}
const response= await admin.messaging().send(message)
if (response){
res.status(200).json({
    message:"notification envoyer avec success",
    data:response
})
}
else{
    res.status(400).json({
        message:"erreur",
        data:null
    }) 
}
}
catch(error){
    res.status(500).json({
        message:error.message,
        data:null
    }) 
}    
},
calculateUserCountByItemKey :async (req,res) => {
    try {
      const result = await userModel.aggregate([
        {
          $match: {
            itemKey: req.body.itemKey,
          },
        },
        {
          $group: {
            _id: '$itemKey',
            userCount: { $sum: 1 },
          },
        },
      ]);
      if (result.length > 0) {
        console.log(result[0].userCount)
       res.status(200).json({
       message:"succcess",
       data: `nombre du ${req.body.itemKey} : ${result[0].userCount}`
       })
      } else {
        return 0;
      }
    } catch (error) {
      console.error('Error calculating user count:', error);
      res.status(400).json({
        error:error.message,
        message:"vendeur échec",
      })
    }
  }

 }