var geoLit = {}

var async = require('async')
var mongoose = require('mongoose')
var Schema = mongoose.Schema


var LocationSchema = new Schema({  
    name: String,
    loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
    }
});

var Location = mongoose.model('Location', LocationSchema)


geoLit.init = function(callbackIn){

    mongoose.connect('mongodb://localhost/geospatial_db', function(err) {  
        if( err ){
            callbackIn(err)
        } else {
            callbackIn()
        }









     // var limit = req.query.limit || 10;

     //    // get the max distance or set it to 8 kilometers
     //    var maxDistance = req.query.distance || 8;

     //    // we need to convert the distance to radians
     //    // the raduis of Earth is approximately 6371 kilometers
     //    maxDistance /= 6371;

     //    // get coordinates [ <longitude> , <latitude> ]
     //    var coords = [];
     //    coords[0] = req.query.longitude;
     //    coords[1] = req.query.latitude;

     //    // find a location
     //    Location.find({
     //      loc: {
     //        $near: coords,
     //        $maxDistance: maxDistance
     //      }
     //    }).limit(limit).exec(function(err, locations) {
     //      if (err) {
     //        return res.json(500, err);
     //      }

     //      res.json(200, locations);
     //    });



    });

}

geoLit.init(function( err ){
    if( err ){
        console.log(err)
        return
    }
    var coord = new Location({
        name: 'test location',
        loc: [48.002, 49.001, ]
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


})

module.exports = geoLit