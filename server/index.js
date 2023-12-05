// index.js (Express.js server)

const mongoose = require('mongoose');
const express = require('express');
const DataModel=require("./model/datamodel")
const cors = require('cors');
const {MongoClient} = require('mongodb')

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());



mongoose.connect('mongodb://localhost:27017/blackcofferdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});








// API route to get data

app.get('/api/data',(req,res)=>{
     res.send("Hello from server")

})

app.get('/', async (req, res) => {
  try {
    
    const data = await DataModel.find({});
    // console.log("data is",data)
     res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
