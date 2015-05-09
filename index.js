var config = require('./config')

/*******************************************************************************

                    CONFIGURE APP

*******************************************************************************/

var express = require('express');
var app = module.exports.app = exports.app = express();
var bodyParser = require('body-parser')
var session = require('express-session')

if( config.environment === 'development' ){
    app.use(require('connect-livereload')());
}

app.use(express.static(__dirname + '/public'));

app.use(require('cookie-parser')(config.cookieSecret)); 
app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** 
*   Setup commenting middleware
*/
var knex = require('knex')(config.commentsDB);
var options = { 'knex': knex, useStringPostId: true };

var sqlCommentsMiddleware = require('sql_comments_middleware')(options);

app.use('/discussion', sqlCommentsMiddleware);

/*******************************************************************************

                    PULL IN ROUTES AND START SERVER

*******************************************************************************/

require('./backend_app/routes')(app);

var server = app.listen(config.port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});