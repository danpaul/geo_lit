var config = require('../../../config.js')

module.exports = {
    log: function(stuff){
        if( config.debug){ console.log(stuff); }        
    }
};