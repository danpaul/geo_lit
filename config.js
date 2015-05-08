var config = {};

var config = {};

config.environment = process.env.NODE_ENV

if( config.environment === 'development' ){

    config.sessionSecret = 'super secret';
    config.cookieSecrety = 'super secret';
    config.port = 3000;

} else if( config.environment === 'production' ) {



} else {
    throw('App must be started with env flag set.')
}

module.exports = config;