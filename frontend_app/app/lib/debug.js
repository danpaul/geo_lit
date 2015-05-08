var config = require('../../config')

module.exports = {
    log: function(stuff){
        if( config.debug){ console.log(stuff); }        
    }
};