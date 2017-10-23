const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes');
require('dotenv').config();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/', router);

app.get('/', function (req, res) {
    res.sendFile( path.join(__dirname, 'build', 'index.html') );
});

app.listen( process.env.PORT, ()=>console.log(`server start on port ${process.env.PORT}`) );