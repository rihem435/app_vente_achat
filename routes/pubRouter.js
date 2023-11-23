const routes=require("express").Router()
const {isAuth}=require("../middleware/isAuth")
const uploadFile=require("../middleware/uploadFile")
const pubController=require('../controller/pubController')
routes.post("/create",isAuth,uploadFile.single("image_pub"),pubController.create)
routes.put('/update/:id',isAuth,uploadFile.single("image_pub"),pubController.update)
routes.delete('/delete/:id',isAuth,pubController.delete)
module.exports=routes