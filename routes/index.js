var express = require('express');
var router = express.Router();
const request = require('request');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
ObjectId = require('mongodb').ObjectId;

//Mongodb connection
const url = 'mongodb+srv://manhdkgch18056:DaoKhacManh00@cluster0-pyltn.mongodb.net/test?retryWrites=true&w=majority';
MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err);
  db = client.db('WebProject')
});

router.get('/', async(req, res)=>{
  let client = await MongoClient.connect(url);
  let dbo = client.db("WebProject")
  let results = await dbo.collection("products").find({}).toArray();
  res.render('manageProduct', {products: results});
});
router.get('/insertProduct', async(req, res)=>{
  res.render('insertProduct');
});
router.post('/insertProduct', async (req, res)=>{
  var insertProduct = {
    product_name: req.body.product_name,
    product_color: req.body.product_color,
    product_price: req.body.product_price
  };
  let client = await MongoClient.connect(url);
  let dbo = client.db("WebProject");
  await dbo.collection("products").insertOne(insertProduct, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
  });
  let result2 = await dbo.collection("products").find({}).toArray();
  res.render('manageProduct', {products: result2});
});
router.get('/delete', async (req, res)=>{
  let id = req.query.id;
  var ObjectID = require('mongodb').ObjectID;
  let client = await MongoClient.connect(url);
  let dbo = client.db("WebProject");
  await dbo.collection("products").deleteOne({"_id": ObjectID(id)});
  let results = await dbo.collection("products").find({}).toArray();
  res.render('manageProduct', {products: results})
})
router.get('/edit', async (req, res) => {
  let id = req.query.id;
  var ObjectID = require('mongodb').ObjectID;
  let client = await MongoClient.connect(url);
  let dbo = client.db("WebProject");
  let result = await dbo.collection("products").findOne({"_id": ObjectID(id)});
  res.render('editProduct', {products: result});
});

router.post('/editProduct', async (req, res) => {
  let id = req.body.id;
  console.log("ID: " + id);
  let product_name = req.body.product_name;
  let product_price = req.body.product_price;
  let product_color = req.body.product_color;

  let newValues = {
    $set: {
      product_name: product_name,
      product_color: product_color,
      product_price: product_price

    }
  };
  var ObjectID = require('mongodb').ObjectID;
  let condition = {"_id": ObjectID(id)};

  let client = await MongoClient.connect(url);
  let dbo = client.db("WebProject");
  await dbo.collection("products").updateOne(condition, newValues);
  let results = await dbo.collection("products").find({}).toArray();
  res.render('manageProduct', {products: results});
});
module.exports = router;
