const express = require('express');
const favicon = require('express-favicon');
const engines = require('consolidate');
const app = express();
var path = require("path");
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000
app.use(bodyParser.urlencoded({extended: false}));
var publicDir = require('path').join(__dirname, '/public');

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

var productsController = require('./routes/index.js');
app.use('', productsController);


app.use(favicon(__dirname + '/public/images/favicon.ico'));


app.listen(PORT, () => console.log(`Listening on ${PORT}`));