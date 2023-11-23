const routes=require("express").Router()
const uploadFile=require("../middleware/uploadFile")
const vendeurController=require('../controller/vendeurController')
const {isAuth}=require("../middleware/isAuth")


routes.post("/registre",uploadFile.single("image"),vendeurController.registre)
routes.put('/update/:id',isAuth,uploadFile.single("image"),vendeurController.update)
routes.delete('/delete/:id',isAuth,vendeurController.delete)
routes.get('/vendeurs',isAuth, vendeurController.getAll)
routes.get('/getVendeur/:id',isAuth, vendeurController.getById)
module.exports=routes