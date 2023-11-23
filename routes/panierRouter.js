const routes=require("express").Router()
const uploadFile=require("../middleware/uploadFile")
const panierController=require('../controller/panierController')
routes.post("/create",uploadFile.single("image_produit"),panierController.create)
routes.put('/update/:id',uploadFile.single("image"),panierController.update)
routes.delete('/delete/:id',panierController.delete)
routes.get('/paniers', panierController.getAll)
routes.get('/getPanier/:id', panierController.getById)
module.exports=routes