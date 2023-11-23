const routes=require("express").Router()
const commandeController=require('../controller/commandeController')

routes.post("/create",commandeController.create)
routes.put('/update/:id',commandeController.update)
routes.get('/commandes', commandeController.getAll)
routes.get('/calculateProductPurchaseCounts',commandeController.calculateProductPurchaseCounts)
routes.get('/calculateMostPurchasedProduct',commandeController.calculateMostPurchasedProduct)
routes.delete('/delete/:id',commandeController.delete)


module.exports=routes