const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');
require('dotenv').config();


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/', router);

app.get('/', function (req, res) {
    res.sendFile( path.join(__dirname, 'build', 'index.html') );
});

app.listen( process.env.PORT, ()=>console.log(`server start on port ${process.env.PORT}`) );