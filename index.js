/*******************************************************************************

                    SETUP/DATA

*******************************************************************************/

var _ = require('underscore')
var express = require('express')
var async = require('async')
var bodyParser = require('body-parser')
var config = require('./config')
var Point = require('./lib/point')

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var point = new Point({ mongoUrl: config.mongoUrl })

var getReponseObject = function(){
    return{
        success: true,
        errorMessage: ''
    }
}

/*******************************************************************************

                    ROUTES

*******************************************************************************/

app.get('/', function(req, res){
    res.send('test')
})

// Add route
app.post('/position', function (req, res) {
    var responseObject = getReponseObject()
    var pointData = req.body
    //TODO: validation

    point.add(pointData, function(err){
        if( err ){
            console.log(err)
            responseObject.success = false
        }
    })

    res.json(responseObject)
})

/*******************************************************************************

                    START SERVER

*******************************************************************************/

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})