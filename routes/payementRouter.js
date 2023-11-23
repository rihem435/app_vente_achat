const routes=require("express").Router()
const uploadFile=require("../middleware/uploadFile")
const payementController=require('../controller/payementController')
routes.post("/registre",uploadFile.single("image"),payementController.registre)
routes.put('/update/:id',uploadFile.single("image"),payementController.update)
routes.delete('/delete/:id',payementController.delete)
routes.get('/payement', payementController.getAll)
module.exports=routes