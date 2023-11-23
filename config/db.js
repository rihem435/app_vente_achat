const mongoose=require('mongoose');

const connectDB = async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/apponeway').then(() => console.log('Connected!'));
  
    

  console.log(`MongoDB connected`.cyan.bold);
}
module.exports = connectDB;
