const commandeModel = require("../models/commandeModel");
const produitModel = require("../models/produitModel");
const acheteurModel=require("../models/acheteurModel")

module.exports = {
  create: async (req, res) => {
    try {
      const commande = new commandeModel(req.body);
      await commande.save().then((commande) => {
        res.status(200).json({
          message: 'commande created',
          data: commande,
        });
      });
      await produitModel.findByIdAndUpdate(req.body.produit,{$push:{commandes:commande}})

    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: "commande échec",
        data: null,
      });
    }
  },


  getAll: async (req, res) => {
    try {
      await commandeModel.find().then((commande) => {
        res.status(200).json({
          message: 'get all commande success',
          data: commande,
        });
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
        commandeModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((commande) => {
        res.status(200).json({
          message: 'commande  updated',
          data: commande,
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
        commandeModel.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({
          message: 'commande  deleted',
        });
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  calculateProductPurchaseCounts : async (req,res) => {
    try {
      const result = await commandeModel.aggregate([
        {
          $unwind: '$liste_produit',
        },
        {
          $group: {
            _id: '$liste_produit',
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
      ]);
      const productPurchaseCounts = result.map((item) => ({
        productId: item._id,
        purchaseCount: item.count,
      }));
  console.log(productPurchaseCounts)
  res.status(200).json({
    message:"success",
    data:productPurchaseCounts
  })
    } catch (error) {
      console.error('Error calculating product purchase counts:', error);
      res.status(400).json({
        error: error.message,
      });
    }
  },
  //fct calcul best seller product
  calculateMostPurchasedProduct: async (req,res)=>{
    console.log('----------------------------------')
    try {
      const result = await commandeModel.aggregate([
        {
          $unwind: '$liste_produit'
        },
        {
          $group: {
            _id: '$liste_produit',
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            count: -1
          }
        },
        {
          $limit: 1
        }
      ]);
      console.log('----------ddddd------------------------')
      if (result.length > 0) {
        const mostPurchasedProductId = result[0]._id;
        res.status(200).json({
          message:"success",
          data:mostPurchasedProductId
        })
        // Now you can fetch the details of the most purchased product using mostPurchasedProductId
        // For example: const mostPurchasedProduct = await Produit.findById(mostPurchasedProductId);
        console.log('Most purchased product ID:', mostPurchasedProductId);
      } else {
        console.log('No orders found.');
      }
    } catch (error) {
      console.error('Error calculating most purchased product:', error);
      res.status(400).json({
        error: error.message,
      });
    }
  }
}
