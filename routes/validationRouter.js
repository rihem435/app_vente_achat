const routes=require("express").Router()
const validationController=require('../controller/validationController')

routes.post("/create",validationController.create)
routes.delete('/delete/:id',validationController.delete)
routes.get('/validation', validationController.getAll)



module.exports=routes