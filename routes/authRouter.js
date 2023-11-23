const routes=require("express").Router()
const authController=require("../controller/authController")
const {isAuth}=require("../middleware/isAuth")
routes.post("/login",authController.login)
routes.post("/logout",isAuth,authController.logout)
routes.post("/changePassword",isAuth,authController.changePassword)
routes.post("/sendEmail",authController.sendEmail)
routes.post("/verifyCode",authController.verifyCode)
module.exports=routes