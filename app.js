const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//Created Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const paymentRoutes = require('./routes/payment');

//Middlewares
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(cors());

//Database Stuff
mongoose
  .connect('mongodb://localhost:27017/E-commerce', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDb Connected'));

//My Actual Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/payment', paymentRoutes);

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server is Started at Port : ${port}`));
