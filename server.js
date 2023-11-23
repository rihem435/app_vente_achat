const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const acheteurRoute=require('./routes/acheteurRouter')
const vendeurRoute=require('./routes/vendeurRouter')
const livreurRoute=require('./routes/livreurRouter')
const produitRoute=require('./routes/produitRouter')
const panierRoute=require('./routes/panierRouter')
const adminRoute=require('./routes/adminRouter')
const magasineRoute=require('./routes/magasineRouter')
const authRoute=require('./routes/authRouter')
const categorieRoute=require('./routes/categorieRouter')
const contactRoute=require('./routes/contactRouter')
const ratingRoute=require('./routes/ratingRouter')
const commandeRoute=require('./routes/commandeRouter')
const validationRoute=require('./routes/validationRouter')
const pubRoute=require('./routes/pubRouter')
const userRoute=require('./routes/userRouteur');



app.use(morgan('dev'));
app.use(express.json({}));
app.use(cors());
app.use(express.json({
  extended:true
}))

connectDB();
app.use('/acheteur', acheteurRoute);
app.use('/vendeur', vendeurRoute);
app.use('/livreur', livreurRoute);
app.use('/produit', produitRoute);
app.use('/panier', panierRoute);
app.use('/admin', adminRoute);
app.use('/magasine', magasineRoute);
app.use('/categorie', categorieRoute);
app.use('/auth',authRoute);
app.use('/contact',contactRoute);
app.use('/rating',ratingRoute);
app.use('/commande',commandeRoute);
app.use('/validation',validationRoute);
app.use('/pub',pubRoute);
app.use('/user',userRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`.red.underline.bold);
});
