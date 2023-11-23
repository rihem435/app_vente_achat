const routes=require("express").Router()
const userController=require("../controller/userController")
routes.post("/notification",userController.pushNotification)
routes.get("/calculateUserCountByItemKey",userController.calculateUserCountByItemKey)




module.exports=routes