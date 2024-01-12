const express = require('express');
const dbConnect = require('./config/dbConnect');
const cloudinary=require('./config/cloudinary');
cloudinary.cloudinaryConnect();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const authRoutes=require('./routes/authRoutes')
const placesRoutes=require('./routes/placesRoutes')
const uploadRoutes=require('./routes/uploadRoutes')
const bookingroutes=require('./routes/bookingRoutes')
const PORTADDRESS = process.env.PORT || 4000;
const fileupload=require("express-fileupload");
app.use(fileupload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
dbConnect();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));


app.use('/api/user', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/bookings', bookingroutes);
app.listen(PORTADDRESS, () => {
    console.log(`Server running on ${PORTADDRESS}`);
  });

