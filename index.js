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