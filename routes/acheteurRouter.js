const routes=require("express").Router()
const acheteurController=require('../controller/acheteurController')
const {isAuth}=require("../middleware/isAuth")
routes.post("/registre",acheteurController.registre)
routes.put('/update/:id',isAuth,acheteurController.update)
routes.delete('/delete/:id',isAuth,acheteurController.delete)
routes.get('/acheteurs',isAuth, acheteurController.getAll)
routes.get('/getAcheteur/:id',isAuth, acheteurController.getById)
module.exports=routes