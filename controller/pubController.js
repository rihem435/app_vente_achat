const { model } = require("mongoose");
const pubModel = require("../models/pubModel");

module.exports = {
    create: async (req, res) => {
        try {
            req.body["image_pub"] = !req.file ? null : req.file.filename;

            const pub = new pubModel(req.body);

            console.log("----------------pub------------");

            await pub.save().then(() => {
                res.status(200).json({
                    message: 'pub created',
                    data: pub,
                });
            });

            console.log('++++++++++++++++++++++++++++++');
        } catch (error) {
            res.status(400).json({
                error: error.message,
                message: "pub échec",
                data: null,
            });
        }
    },



    update: async (req, res) => {
        try {
            if  (req.file != null )  
            {
                req.body["image_pub"] =req.file.filename;
            }
            pubModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((pub) => {
                res.status(200).json({
                    message: 'pub  updated',
                    data: pub,
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
            pubModel.findByIdAndDelete(req.params.id).then(() => {
                res.status(200).json({
                    message: 'pub  deleted',
                });
            });
        } catch (error) {
            res.status(400).json({
                error: error.message,
            });
        }
    },


}