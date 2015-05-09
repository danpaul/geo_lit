var geoLit = {};

var _ = require('underscore');
var user = require('./user');
var services = require('./services')
var debug = require('./debug')

/*******************************************************************************

                    DATA

*******************************************************************************/

var DEFAULT_RANGE = 5; // distance in KM
var TEST_MOVE = false;
var TEST_MAX_DISTANCE = 0.1;

var ERROR_USER_NOT_LOGGED_IN = 'You must be logged in.'

geoLit.map = null;
geoLit.currentLatitude = null;
geoLit.currentLongitude = null;
geoLit.mapFollow = true;
geoLit.intervalId = null;
geoLit.intervalTime = 1000 * 5; //10 seconds
geoLit.mapId = null;
geoLit.placeMarkers = {};
geoLit.userMarker = null;
geoLit.zoomLevel = 12;

/*******************************************************************************

                    FUNCTIONS

*******************************************************************************/

// creates the actual map in the DOM
geoLit.createMap = function(){
    var mapOptions = {
        zoom: geoLit.zoomLevel,
        center: new google.maps.LatLng(geoLit.currentLatitude,
                                       geoLit.currentLongitude)
    };
    geoLit.map = new google.maps.Map(document.getElementById(geoLit.mapId),
                                     mapOptions);
}

// gets user's current position
geoLit.getPosition = function(callbackIn){
    navigator.geolocation.getCurrentPosition(function(position){
        callbackIn(null, { latitude: position.coords.latitude,
                           longitude: position.coords.longitude });
    }, callbackIn)
}

geoLit.init = function(mapId, callbackIn){
    geoLit.mapId = mapId
    google.maps.event.addDomListener(window, 'load', function(){
        geoLit.updatePosition(function(err){
            if( err ){ callbackIn(err); }
            else{
                geoLit.createMap();
                geoLit.updateUserMarker();
                geoLit.intervalId = window.setInterval(geoLit.intervalCallback,
                                                       geoLit.intervalTime);
                callbackIn();
            }
        })
    })
}

geoLit.updatePosition = function(callbackIn){
    navigator.geolocation.getCurrentPosition(function(position){
        geoLit.currentLatitude = position.coords.latitude;
        geoLit.currentLongitude = position.coords.longitude;
        callbackIn();
    }, callbackIn);
}

// asdf
geoLit.addPlacesToMap = function(places){

    _.each(places, function(place){

        // set new marker
        var latLang = new google.maps.LatLng(place.location[1],
                                             place.location[0]);

        // add marker to map        
        geoLit.placeMarkers[place._id] =  new google.maps.Marker({
            position: latLang,
            map: geoLit.map,
            title: 'Current Position',
            geoLit: {_id: place._id}
        });

        // trigger events on clicking placed
        google.maps.event.addListener(geoLit.placeMarkers[place._id],
                                    'click',
                                    function(){

            $(document).trigger('geo-lit-place-click', [this.geoLit]);
        });
    })
}

geoLit.updatePlaces = function(callbackIn){

    // debug.log('updating places');

    services.findNear({latitude: geoLit.currentLatitude,
                    longitude: geoLit.currentLongitude,
                    range: DEFAULT_RANGE},
                   function(err, places){

        // find any markers not currently on the map
        var newPlaces = _.filter(places, function(place){
            return(typeof(geoLit.placeMarkers[place._id]) === 'undefined')
        })

        geoLit.addPlacesToMap(newPlaces)

    })
}

geoLit.updateUserMarker = function(){
    // delete existing marker
    if( geoLit.userMarker !== null ){ geoLit.userMarker.setMap(null) }


// asdf asdf asdf
    // set new marker
    var latLang = new google.maps.LatLng(geoLit.currentLatitude + .002,
                                         geoLit.currentLongitude + .002);

    geoLit.userMarker = new google.maps.Marker({
      position: latLang,
      map: geoLit.map,
      title: 'Current Position'
    });

    if( geoLit.mapFollow ){
        geoLit.recenterMap()
    }
}

// recenters map on users current position
geoLit.recenterMap = function(){
    var center = new google.maps.LatLng(geoLit.currentLatitude,
                                        geoLit.currentLongitude);
    geoLit.map.panTo(center);
}

// TODO: add function to check if points should get updated
geoLit.intervalCallback = function(){

    var updatePlaces = true
    geoLit.updatePosition(function(err){

        if( TEST_MOVE ){
            geoLit.currentLatitude += Math.random() * TEST_MAX_DISTANCE
            geoLit.currentLongitude += Math.random() * TEST_MAX_DISTANCE
        }

        if(err){
            console.log(err)
            return
        }
        geoLit.updateUserMarker()
        if( updatePlaces ){
            geoLit.updatePlaces(function(err){
                if( err ){ console.log(err) }
            })
        }
    })
}

// add place with title to map
geoLit.addPlace = function(title, callback){



    if( !user.isLoggedIn ){
        callback(ERROR_USER_NOT_LOGGED_IN);
        return;
    }

    geoLit.getPosition(function(err, location){
        if( err ){
            callback('Unable to find location.');
            return;
        }

        var placeObject = {};
        placeObject.location = [location.longitude, location.latitude];

// console.log(place);
        placeObject.title = title;
        placeObject.user = user.id;
        services.add(placeObject, function(err, resp){
// console.log('asdfasdfasdf')
// console.log(resp);
// console.log(err);
            if( err ){ callback(err); }
            else { callback(); }
        })
    })
// console.log(geoLit.getPosition());
// console.log(callback);
// return;



}

module.exports = geoLit