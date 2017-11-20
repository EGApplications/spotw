const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');
const config = require('./config');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/', router);

app.get('/', function (req, res) {
    res.sendFile( path.join(__dirname, 'build', 'index.html') );
});

app.listen( config.port, ()=>console.log(`server start on port ${config.port}`) );