module.exports = {
    isLoggedIn: function(req, res){
        return( req &&
                req.session &&
                req.req.session.isLoggedIn &&
                req.req.session.isLoggedIn === true );
    },
    handleUnauthorizedUser: function(req, res){
        
    }
}