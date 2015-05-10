var STATUS_SUCCESS = 'success',
    STATUS_FAILURE = 'failure',
    STATUS_ERROR = 'error';

module.exports = {
    register: function(endpoint, email, password, callback){
        makeRequest({
            method: 'POST',
            url: endpoint + '/register',
            data: {
                email: email,
                password: password
            }            
        }, callback)
    },
    login: function(endpoint, email, password, callback){
        makeRequest({
            method: 'POST',
            url: endpoint + '/login',
            data: {
                'email': email,
                'password': password
            }
        }, callback)
    }
}

var makeRequest = function(requestData, callback){
    requestData.success = function(response){
        if( response.status === STATUS_SUCCESS ){
            callback(null, response.data);
        } else if(response.status === STATUS_FAILURE || 
                  response.status === STATUS_ERROR ){
            callback(response.message);
        } else {
            callback('An error occurred.');
        }
    }

    requestData.error = function(jqXHR, status, errorThrown){
        callback('Error contacting server. You might want to try again.');
    }

    $.ajax(requestData);
}