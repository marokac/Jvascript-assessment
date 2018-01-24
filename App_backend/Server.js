const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;


var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shop_onlline',
    port:3316
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log('connection' + err)
    }
    app.use(bodyParser.json({
        type: "*/*"
    }));
    require('./app/routes')(app, connection);
    app.listen(port, () => {
        console.log('server is running on port 3000');
    });

});