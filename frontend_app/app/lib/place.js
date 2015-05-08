var place = {}
var config = require('../../config.js')

var SERVER_ERROR = new Error('A server error occurred.')

place.add = function(positionData, callbackIn){

    $.ajax({
        type: "POST",
        url: config.geoLitEndpoint + '/position',
        data: positionData,
        success: function(data){ callbackIn() },
        error: function(err){
            console.log(err)
            callbackIn(SERVER_ERROR)
        },
        dataType: 'JSON'
    });

}


place.findNear = function(positionData, callbackIn){

    $.ajax({
        type: "GET",
        url: config.geoLitEndpoint + '/positions-near',
        data: positionData,
        success: function(data){
            if( typeof(data.success) === 'undefined' ||
                !data.success ){
                callbackIn(new Error(data.errorMessage))
            } else { callbackIn(null, data.data) }
        },
        error: function(err){
            console.log(err)
            callbackIn(SERVER_ERROR)
        },
        dataType: 'JSON'
    });

}

module.exports = place