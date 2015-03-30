var geoLit = {}

/*******************************************************************************

                    SETUP/DATA

*******************************************************************************/

var async = require('async')
var mongoose = require('mongoose')

var config = require('./config')

var Schema = mongoose.Schema

var MessageSchema = new Schema({  
    title: String,
    user: Number,
    // _user: Schema.Types.ObjectId,
    loc: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d' // create the geospatial index
    }
});

var Message = mongoose.model('Message', MessageSchema)

/*******************************************************************************

                    FUNCTIONS

*******************************************************************************/

// intialize mongo connection
geoLit.init = function(){
    mongoose.connect(config.mongoUrl, function(err) {  
        if( err ){ throw(err) }
    });
}

// `messageData` should include: longitude, latitude, name, title, user
geoLit.add = function(messageData, callbackIn){

    var message = new Message({
        title: messageData.title,
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

geoLit.findAllMessages = function(callbackIn){
    Message.find({}, function(err, docs){
        if(err){
            console.log(err)
            return
        }
        console.log(docs)
        callbackIn(docs)
    })
}

module.exports = geoLit