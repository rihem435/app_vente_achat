const routes=require("express").Router()
const uploadFile=require("../middleware/uploadFile")
const livreurController=require('../controller/livreurController')
const {isAuth}=require("../middleware/isAuth")

routes.post("/registre",uploadFile.single("image"),livreurController.registre)
routes.put('/update/:id',isAuth,uploadFile.single("image"),livreurController.update)
routes.delete('/delete/:id',isAuth,livreurController.delete)
routes.get('/livreurs',isAuth, livreurController.getAll)
routes.get('/getLivreur/:id',isAuth, livreurController.getById)
module.exports=routes