/*******************************************************************************

                    SETUP/DATA

*******************************************************************************/

var _ = require('underscore')
var express = require('express')
var async = require('async')
var bodyParser = require('body-parser')
var config = require('./config')

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*******************************************************************************

                    ROUTES

*******************************************************************************/

app.get('/', function(req, res){
    res.send('test')
})

// Add route
app.post('/position', function (req, res) {
    // res.send('POST request to the homepage')
    res.json({test: 'foo'})
})

/*******************************************************************************

                    START SERVER

*******************************************************************************/

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})