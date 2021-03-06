/*******************************************************************************

                    SETUP

*******************************************************************************/

var Point = require('./lib/point');
var point = new Point({ mongoUrl: 'mongodb://localhost/test_point_db' });

var getReponseObject = function(){
    return{
        status: 'success',
        errorMessage: '',
        data: null
    }
}

/*******************************************************************************

                    ROUTES

*******************************************************************************/

module.exports = function(app){

    app.get('/', function(req, res){ res.sendFile('../public/index.html'); });

    app.get('/healthcheck', function(req, res){
        console.log(req.session);
        res.send('ok')
    })

    app.get('/positions-all', function(req, res){
        var responseObject = getReponseObject()
        point.findAll(function(err, points){
            if( err ){
                console.log(err)
                responseObject.status = 'error'
            } else {
                responseObject.data = points
            }
            res.json(responseObject)
        })
    })

    // example call: /positions-near?longitude=-73.9475406&latitude=40.6762954&range=5.0
    // range is in KM
    // TODO: validation
    app.get('/positions-near', function(req, res){

        var responseObject = getReponseObject()
        point.findNear(req.query.longitude,
                       req.query.latitude,
                       req.query.range,
                       function(err, points){

            if( err ){
                console.log(err)
                responseObject.status = 'error'
            } else {
                responseObject.data = points
            }
            res.json(responseObject)

        })    
    })

    /**
    *    locationData should look like this
    *    {
    *        title: 'some title',
    *        user: 12233,
    *        location: [2.17403, 41.40338] // longitude, latitude
    *    }
    */
    app.post('/position', function (req, res) {
        var responseObject = getReponseObject()
        var pointData = req.body
        //TODO: validation

        point.add(pointData, function(err, point){
            if( err ){
                console.log(err)
                responseObject.status = 'error'
            } else {
                responseObject.data = point;
            }
            res.json(responseObject)
        })        
    })
}