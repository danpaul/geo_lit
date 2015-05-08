/*******************************************************************************

                    SETUP

*******************************************************************************/

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

    app.post('/position', function (req, res) {
        var responseObject = getReponseObject()
        var pointData = req.body
        //TODO: validation
    /**
        locationData should look like this
        {
            title: 'some title',
            user: 12233,
            location: [2.17403, 41.40338] // longitude, latitude
        }
    */
        point.add(pointData, function(err){
            if( err ){
                console.log(err)
                responseObject.status = 'error'
            }
    console.log(responseObject);
            res.json(responseObject)
        })

        
    })



}