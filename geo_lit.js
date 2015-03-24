var geoLit = {}

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
var Message = mongoose.model('Location', MessageSchema)

geoLit.init = function(callbackIn){
    mongoose.connect('mongodb://localhost/geospatial_db', function(err) {  
        if( err ){
            callbackIn(err)
        } else {
            callbackIn()
        }
    });
}

// location message object should include: longitude, latitude, name, message,
//  user
geoLit.add = function(messagObject, callbackIn){

    var messagObject = new MessageObject({
        name: MessageObject.name,
        message: MessageObject.message,
        _user: MessageObject.user,
        loc: [MessageObject.longitude, message.latitude] // [<longitude>, <latitude>]
    })

    coord.save(function(err){
        if( err ){
            console.log(err)
            return
        }

        console.log('saved!')
        Location.find({}, function(err, docs){
            if(err){
                console.log(err)
                return
            }
            console.log(docs)
        })

    })

}

module.exports = geoLit