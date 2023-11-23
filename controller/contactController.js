const contactModel = require("../models/contactModel");

module.exports = {
  create: async (req, res) => {
    try {
      const contact = new contactModel(req.body);
      await contact.save().then((contact) => {
        res.status(200).json({
          message: 'contact created',
          data: contact,
        });
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: "contact échec",
        data: null,
      });
    }
  },

  update: async (req, res) => {
    try {
      contactModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((contact) => {
        res.status(200).json({
          message: 'contact  updated',
          data: contact,
        });
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  getAll: async (req, res) => {
    try {
      await contactModel.find().then((contact) => {
        res.status(200).json({
          message: 'get all contact success',
          data: contact,
        });
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      contactModel.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({
          message: 'contact  deleted',
        });
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};
