const routes=require("express").Router()
const uploadFile=require("../middleware/uploadFile")
const magasineController=require('../controller/magasineController')
routes.post("/create",uploadFile.fields([{name:"image_magasine",maxCount:1},{name:"image_produit",maxCount:1}]),magasineController.create)
routes.put('/update/:id',uploadFile.fields([{name:"image_magasine",maxCount:1},{name:"image_produit",maxCount:1}]),magasineController.update)
routes.delete('/delete/:id',magasineController.delete)
routes.get('/magasines', magasineController.getAll)
routes.get('/getMagasine/:id', magasineController.getById)
routes.get('/getMagasine', magasineController.getByName)

module.exports=routes