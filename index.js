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

/** 
*   Session handling/body parseing
*/
app.use(require('cookie-parser')(config.cookieSecret)); 
app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** 
*   Commenting middleware
*/
var knex = require('knex')(config.commentsDB);
var options = { 'knex': knex, useStringPostId: true };
options.authMiddleware = function(req, res, next){
    if( req &&
        req.session &&
        req.session.isLoggedIn &&
        req.session.isLoggedIn === true ){

        next();
    } else {
        res.json({status: 'error', errorMessage: 'You must first log in.'});
    }
}
var sqlCommentsMiddleware = require('sql_comments_middleware')(options);
app.use('/discussion', sqlCommentsMiddleware);

/**
*   User management middleware
*/
var sqlLoginMiddleware = require('sql_login_middleware')({ 'knex': knex });
app.use('/user', sqlLoginMiddleware);

/*******************************************************************************

                    PULL IN ROUTES AND START SERVER

*******************************************************************************/

require('./backend_app/routes')(app);

var server = app.listen(config.port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});