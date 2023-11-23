const { model } = require("mongoose");
const categorieModel = require("../models/categorieModel");

module.exports = {
    create: async (req, res) => {
        try {
            req.body["image_categorie"] = !req.file ? null : req.file.filename;

            const categories = new categorieModel(req.body);

            console.log("----------------categories------------");

            await categories.save().then(() => {
                res.status(200).json({
                    message: 'categories created',
                    data: categories,
                });
            });

            console.log('++++++++++++++++++++++++++++++');
        } catch (error) {
            res.status(400).json({
                error: error.message,
                message: "categories échec",
                data: null,
            });
        }
    },

    update: async (req, res) => {
        try {
            if  (req.file != null )  
            {
                req.body["image_categorie"] =req.file.filename;
            }
            categorieModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((categories) => {
                res.status(200).json({
                    message: 'categories  updated',
                    data: categories,
                });
            });
        } catch (error) {
            res.status(400).json({
                error: error.message,
            });
        }
    },

    delete: async (req, res)=>{
        try {
            categorieModel.findByIdAndDelete(req.params.id).then(() => {
                res.status(200).json({
                    message: 'categorie  deleted',
                });
            });
        } catch (error) {
            res.status(400).json({
                error: error.message,
            });
        }
    },
    getById : async (req,res)=>{
        try{
          categorieModel.findById(req.params.id).then((categories)=>{
            res.status(200).json({
                message:'Find categories ',data:categories
            })
        })}
        catch(error){
            res.status(400).json({
                error:error.message
            })
        }
      
       },
    getAll: async (req, res)=>{
        try {
            await categorieModel.find().then((categories) => {
                res.status(200).json({
                    message: 'get all categorie success',
                    data: categories,
                });
            });
        } catch (error) {
            res.status(400).json({
                error: error.message,
            });
        }
    },

    
};
