var comment = {}

var config = require('../../config.js')

var endPoint = config.geoLitEndpoint + '/discussion'

// commentObject should include: location, parent, userId, comment
comment.add = function(commentObject, callbackIn){

    var url = endPoint + '/' +
              commentObject.location + '/' +
              commentObject.parent

// app.post('/post/:postId/:parentId', function(req, res, next){
    var postData = {
        userId: commentObject.userId,
        comment: commentObject.comment
    }

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


module.exports = comment