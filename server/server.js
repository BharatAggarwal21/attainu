const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const db=require('./config/keys').mongoURI;


app.use(express.json());
app.use(express.urlencoded({extended:false}));
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) 
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log("not "+err));


const auth = require('./routes/api/auth');
app.use('/api/auth',auth);
const items = require('./routes/api/items');
app.use('/api/items',items);

const port= process.env.PORT || 5000;

app.listen(port,()=>console.log('server is running'));


