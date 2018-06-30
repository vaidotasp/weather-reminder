require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json;

//Middleware for static file serving
app.use(express.static('public'));

//Body parser setup
app.use(jsonParser());
app.use(bodyParser.urlencoded({ extended: true }));

//Router setup
app.use('/', routes)

//Pug templating engine setup
app.set('view engine', 'pug')

app.listen(3000 || process.env.PORT)