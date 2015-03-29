/*******************************************************************************

                    SETUP/DATA

*******************************************************************************/

// var geoLit = {}

var DEFAULTS = {
    mogoDbName: 'geo_lit_db',
    mongoUrl: 'mongodb://localhost/geo_lit_db'
}

var _ = require('underscore')
var express = require('express')
var app = express()
var async = require('async')
var mongoose = require('mongoose')

var bodyParser = require('body-parser')

var config = require('./config')

var Schema = mongoose.Schema

var MessageSchema = new Schema({  
    name: String,
    message: String,
    _user: Schema.Types.ObjectId,
    loc: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d' // create the geospatial index
    }
});

var Message = mongoose.model('Message', MessageSchema)

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

                    FUNCTIONS

*******************************************************************************/

module.exports = function(options){

    var self = this

    self.init = function(){

        mongoose.connect(options.mongoUrl, function(err) {  
            if( err ){ throw(err) }
        });

    }

    // `messageData` should include: longitude, latitude, name, message, user
    self.add = function(messageData, callbackIn){

        var message = new Message({
            name: messageData.name,
            message: messageData.message,
            _user: messageData._user,
            loc: [messageData.longitude, messageData.latitude]
        })

        message.save(function(err){
            if( err ){
                callbackIn(err)
            } else {
                callbackIn()
            }
        })
    }

    self.findAll = function(callbackIn){
        Message.find({}, function(err, docs){
            if(err){
                console.log(err)
                return
            }
            console.log(docs)
            callbackIn(docs)
        })
    }

    self.init()
}

/*******************************************************************************

                    START SERVERS

*******************************************************************************/

app.get('/', function(req, res){
    res.send('test')
})

// Add route
app.post('/position', function (req, res) {
    // res.send('POST request to the homepage')
    res.json({test: 'foo'})
})