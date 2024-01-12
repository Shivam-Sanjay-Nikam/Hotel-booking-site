const database = require('mongoose')
const dotenv=require('dotenv').config();
const dbConnect=async ()=> {database.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
}
module.exports=dbConnect;