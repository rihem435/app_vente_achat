const mongoose= require('mongoose');
const baseOptions={
  discriminatorKey: 'itemKey',  collection: "user"
}
const userSchema =  mongoose.Schema({
  username: {
type: String,
required: true
},
email:{
type: String,
unique:true,
required: true
},
phone: {
  type: String,
  required: false,
  },
password: {
type: String,
required: true
},
produits:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"produits"
  }
],
verifyCode:{
  type:String,
},
fcmToken:{
  type:String,
  required: false
}
},



baseOptions,
);

module.exports= mongoose.model('user', userSchema,);