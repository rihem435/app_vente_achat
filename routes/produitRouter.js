const routes=require("express").Router()
const uploadFile=require("../middleware/uploadFile")
const produitController=require('../controller/produitController')
routes.post("/create",uploadFile.single("image"),produitController.create)
routes.put('/update/:id',uploadFile.single("image"),produitController.update)
routes.delete('/delete/:id',produitController.delete)
routes.get('/produit', produitController.getAll)
routes.get('/getProduit/:id', produitController.getById)
routes.get('/getProduit', produitController.getByName)

module.exports=routes