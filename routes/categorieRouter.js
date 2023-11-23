const routes=require("express").Router()
const uploadFile=require("../middleware/uploadFile")
const categorieController=require('../controller/categorieController')
routes.post("/create",uploadFile.single("image_categorie"),categorieController.create)
routes.put('/update/:id',uploadFile.single("image_categorie"),categorieController.update)
routes.delete('/delete/:id',categorieController.delete)
routes.get('/categories', categorieController.getAll)
routes.get('/getCategorie/:id', categorieController.getById)

module.exports=routes