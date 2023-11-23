const { JsonWebTokenError } = require("jsonwebtoken");
const userModel =require ("../models/userModel");
const jwt =require ("jsonwebtoken");
const TOKEN_KEY="lkjhgfdrtyujk*+-/566";
const REFRESH_TOKEN_KEY="lkjhgfdrtyujk*+-/566";
const bcrypt =require("bcrypt");
const nodemailer=require("nodemailer");
const randomByte = require("crypto");
const code= randomByte.randomBytes(6).toString("hex");
let refrechtokens=[];


const generateToken=(user)=>{
  console.log("generatetoken")
  console.log (user.id)
    return jwt.sign ({id:user.id},TOKEN_KEY,{expiresIn:"5h"})
}



const generateRefreshToken=(user)=>{
    return jwt.sign ({id:user.id},REFRESH_TOKEN_KEY,{expiresIn:"1d"})
}


module.exports={  
    login:async (req,res)=>{
        try{
          console.log('------------------------login---------------------------------------------')
const user=await userModel.findOne({email:req.body.email})
console.log('------------------------login---------------------------------------------')

if(!user){
    res.status(400).json({message : "invalide email"})}
else{
  console.log('------------------------else---------------------------------------------')

const validePassword=await bcrypt.compare(req.body.password,user.password)
console.log(validePassword)
if(!validePassword){
    res.stauts(400).json({message:"invalide password "})

}


else{
  console.log("1111111111111111111111111111111")
    const token=generateToken(user)
    console.log(token)
    const refreshToken=generateRefreshToken(user)
    refrechtokens.push(refreshToken);
          // console.log(refrechtokens);
          let oldTokens = user.tokens || [];
          if (oldTokens.length) {
            oldTokens = oldTokens.filter((t) => {
              const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
              //pour obtient un seul token selon date exmeple: mettre 5 en place 86400
              if (timeDiff < 86400) {
                return t;
              }
            });
          }
          console.log('-------------------------------------------------')
          await userModel.findByIdAndUpdate(user._id, {
            tokens: [
              ...oldTokens,
              { token, signedAt: Date.now().toString() },
            ],
          });
          console.log('success----------------------------------------------------------------------')
          res.status(200).json({
            success: true,
            message: "success",
            data: {
              data: user,
              token: token,
              refrechtoken: refreshToken,
            },
          });
        }
      }

}
        catch(error){

        }
    },
    logout:async(req,res)=>{
      try{
        const token=req.headers.authorization;
        await userModel.findByIdAndUpdate(req.user._id,{$pull:{token:token}}).then(()=>{
res.status(200).json({
  message:"logout success"
})

        })
      }
catch    (error)
{
  res.status(400).json({
    message:"logout error"
 
}
  )}
    },
  

    changePassword:async(req, res)=> {
      
    try{
   const password=await bcrypt.compare(req.body.oldPassword,req.user.password)
   if (password){
    const salt=bcrypt.genSalt(20);
      const hashPassword= await bcrypt.hashSync(
        req.body.newPassword,
        parseInt(salt)
      );

    req.user.password=hashPassword
    req.user.save().then((user)=>{
      res.status(200).json({
        message:"Changer password succes",
        data:user
      })
    })

   }
   else{
    res.status(200).json({
      message:"Entre un password valide",
   }
    )}
    }
    catch(error)
    {
      res.status(400).json({
        message:"erreur",erreur:erreur.message
    }
   ) }
  },
  sendEmail: async (req, res) => {
    try {
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "91309663d17268",
          pass: "c1ba6937c44dd8"
        }
      });
      const user = await userModel.findOne({
        email: req.body.email
      })
      if (!user) {
        return res.status(403).json({ error: 'User not found' });
      } else {
        console.log(req.body.email)
        await transport.sendMail({
          from:"myapp@gmail.com",
          to:req.body.email,
          subject:"code:"+code
        })
        user.verifyCode = code;
        user.save();
        res.status(200).json({
          message: "verification",
        })
      }
    }
    catch (error) {
      res.status(400).json({
        message: "error", error: error.message
      }
      )
    }
  },
  verifyCode:async (req, res) => {
    try {
      const user=await userModel.findOne({verifyCode:req.body.verifyCode})
      if(!user){res.status(400).json({
        message:"user not found",
      })
      }
      else{
        const salt=bcrypt.genSalt(20);
      const hashPassword= await bcrypt.hashSync(
        req.body.newPassword,
        parseInt(salt)
      );
      user.password=hashPassword;
     user.verifyCode="";
     user.save();
      }
      res.status(400).json({
        message: "Password rest success"
      }
      )
    }
    catch (error) {
      res.status(400).json({
        message: "error", error: error.message
      }
      )
    }
  },
}