
const jwt=require ("jsonwebtoken");
const userModel = require ("../models/userModel");
const dotenv = require('dotenv').config();
const TOKEN_KEY="lkjhgfdrtyujk*+-/566";
const REFRESH_TOKEN_KEY="lkjhgfdrtyujk*+-/566";
exports.isAuth = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
      const authHeader = req.headers['authorization'];
      const token =req.headers['authorization'];
      //req.body.token;
    console.log(authHeader);
    if (!token) {
      return res.json({
        success: false,
        message: "token not found",
      });
    }
    try {
      const decode = jwt.verify(token,TOKEN_KEY);
      console.log(decode.id);
      const user = await userModel.findById(decode.id);
      console.log(user);
      if (!user) {
        //console.log(req.headers.authorization);
        return res.json({
          success: false,
          message: "unauthorized access for this user",
        });
      }
       req.user = user;
       next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.json({ success: false, message: "unauthorized access!" });
      }
      if (error.name === "TokenExpiredError") {
        return res.json({
          success: false,
          message: "sesson expired try sign in!",
        });
      }
      res.json({ success: false, message: "Internal server error!" });
    }
     } else {
      res.json({ success: false, message: "unauthorized access ...." });
    }
  };
  
  
  
  