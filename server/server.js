const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
require('dotenv').config();
const routes = require('./src/routes')
const mysqlConn = require('./src/config/mysqlConn');
app.use(bodyparser.json());
const fs = require('fs')
const path = require('path')
var cors = require('cors')
const { sequelize } = require('./models')


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin' , '*' );
    res.header('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept' );
    next();
});

app.use(cors())

app.use('/profile_pic', express.static(path.join(__dirname, '/src/uploads')))



app.use(routes);


const port = process.env.PORT || 5000;
app.listen(port, async () =>{
    await sequelize.authenticate()
    console.log(`Listening on port ${port}..`)
});