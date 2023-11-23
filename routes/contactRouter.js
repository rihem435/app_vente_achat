const routes=require("express").Router()
const contactController=require('../controller/contactController')

routes.post("/create",contactController.create)
routes.put('/update/:id',contactController.update)
routes.delete('/delete/:id',contactController.delete)
routes.get('/contacts',contactController.getAll)
module.exports=routes