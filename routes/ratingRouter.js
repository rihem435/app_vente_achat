const routes=require("express").Router()
const ratingController=require('../controller/ratingController')

routes.post("/create",ratingController.create)
routes.get('/rating', ratingController.getAll)
routes.get('/getRating', ratingController.getByUser)
routes.get('/getState', ratingController.getByState)
module.exports=routes