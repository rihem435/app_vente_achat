const { model } = require("mongoose")
const bcrypt=require("bcrypt")
const ratingModel=require ("../models/ratingModel")

module.exports = {
    create: async (req, res) => {
      try {
        const rating = new ratingModel(req.body);
        await rating.save().then((rating) => {
          res.status(200).json({
            message: 'rating created',
            data: rating,
          });
        });
      } catch (error) {
        res.status(400).json({
          error: error.message,
          message: "rating échec",
          data: null,
        });
      }
    },

    getAll: async (req, res) => {
        try {
          await ratingModel.find().then((rating) => {
            res.status(200).json({
              message: 'get all rating success',
              data: rating,
            });
          });
        } catch (error) {
          res.status(400).json({
            error: error.message,
          });
        }
      },
    

      getByState: async (req,res)=>{
        try{
          ratingModel.find({state:req.query.state}).then((rating)=>{
            res.status(200).json({
                message:'Find state ',data:rating
            })
        })}
        catch(error){
            res.status(400).json({
                error:error.message
            });
        }
      },
      getByUser: async (req,res)=>{
        try{
          ratingModel.find({user:req.query.user}).then((rating)=>{
            res.status(200).json({
                message:'Find rating ',data:rating
            })
        })}
        catch(error){
            res.status(400).json({
                error:error.message
            })
        }
    }
}
