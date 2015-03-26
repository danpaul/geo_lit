var GeoLit = require('../index')

var settings = {
    mogoDbName: 'geo_lit_db',
    mongoUrl: 'mongodb://localhost/geo_lit_db'
}

var geoLit = new GeoLit(settings)

// geoLit.findAll(function(err, docs){
//     if(err){ console.log(err) }
//     else{
//         console.log(docs)
//     }
// })

// var geoLit = require('./geo_lit')

// geoLit.init()

// app.get('/', function(req, res){
//     res.send('test')
// })

// var server = app.listen(3000, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("Example app listening at http://%s:%s", host, port)

// })

// var message = {
//     name: 'test name',
//     message: 'tes message',
//     _user: '77720695c652b0506ccdf346',
//     longitude: 20.0002,
//     latitude: 34.028383
// }
