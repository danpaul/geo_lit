(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var FormController = require('./lib/form_controller.jsx')
var endpointIn = 'http://0.0.0.0:3010';

var loginCallback = function(err){
    if( err ){
        console.log(err)
    } else {
        console.log('login success')
    }
}

React.render(
    React.createElement(FormController, {endpoint: endpointIn, loginCallback: loginCallback}),
    document.getElementById('content')
);

},{"./lib/form_controller.jsx":2}],2:[function(require,module,exports){
var FormInput = require('./input.jsx');
var LoginForm = require('./login_form.jsx');
var RegisterForm = require('./register_form.jsx');

module.exports = React.createClass({displayName: "exports",
    getInitialState: function(){
        return({ activeForm: 'register' })
    },
    handleMenuClickLogin: function(event){
        this.setState({activeForm: 'login'})
    },
    handleMenuClickRegister: function(event){
        this.setState({activeForm: 'register'})
    },
    render: function(){
        var self = this

        var formVisible = {}
        var test = ['login', 'register']
        test.forEach(function(formType){
            formVisible[formType] = (formType === self.state.activeForm);
        })

        return(
            React.createElement("div", {className: "sql-login-wrap"}, 
                React.createElement("div", {className: "sql-login-menu"}, 
                    React.createElement("div", {
                        className: "sql-login-menu-login", 
                        onClick: this.handleMenuClickLogin
                    }, "Login"), 
                    React.createElement("div", {
                        className: "sql-login-menu-register", 
                        onClick: this.handleMenuClickRegister
                    }, "Register")
                ), 
                React.createElement("div", {style: 
                    formVisible['login'] ?
                        {display: 'inherit'} : {display: 'none'}
                }, React.createElement(LoginForm, {
                    endpoint: this.props.endpoint, 
                    loginCallback: this.props.loginCallback})), 
                React.createElement("div", {style: 
                    formVisible['register'] ?
                        {display: 'inherit'} : {display: 'none'}
                }, React.createElement(RegisterForm, {
                    endpoint: this.props.endpoint, 
                    loginCallback: this.props.loginCallback}))
            )
        )
    }
})

},{"./input.jsx":3,"./login_form.jsx":4,"./register_form.jsx":5}],3:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",

    getInitialState: function(){
        return {value: ''}
    },
    getInputValue: function(){
        return this.state.value
    },
    handleChange: function(event){
        this.setState({value: event.target.value})
    },
    render: function(){
        return(
            React.createElement("div", null, 
                React.createElement("label", null, this.props.label), 
                React.createElement("input", {
                    type: this.props.type, 
                    name: this.props.name, 
                    ref: this.props.ref, 
                    value: this.state.value, 
                    onChange: this.handleChange
                })
            )
        )
    }
})

},{}],4:[function(require,module,exports){
var FormInput = require('./input.jsx');
var servicesHandler = require('./services_handler.js')

module.exports = React.createClass({displayName: "exports",
    getInitialState: function(){
        return({errorMessage: ''});
    },
    handleSubmit: function(event){
        event.preventDefault()
        var self = this;

        var email = this.refs.email.getInputValue()
        var password = this.refs.password.getInputValue()

        servicesHandler.login(this.props.endpoint,
                              email,
                              password,
                              function(err, response){
            if( err ){
                self.setState({errorMessage: err});
                return;
            }

            self.setState({errorMessage: ''});

            if( self.props.loginCallback ){
                self.props.loginCallback();
            }
        })
    },
    render: function(){
        return(
            React.createElement("div", {className: "sql-login-login"}, 
                React.createElement("div", {className: "sql-login-error-message"}, 
                    this.state.errorMessage
                ), 
                React.createElement("form", {method: "POST", onSubmit: this.handleSubmit}, 
                    React.createElement(FormInput, {
                        name: "email", 
                        type: "text", 
                        label: "Email", 
                        ref: "email"}), 
                    React.createElement(FormInput, {
                        name: "password", 
                        type: "password", 
                        label: "Password", 
                        ref: "password"}), 
                    React.createElement("input", {type: "submit", value: "submit"})
                )
            )
        )
    }
})

},{"./input.jsx":3,"./services_handler.js":6}],5:[function(require,module,exports){
var FormInput = require('./input.jsx');
var servicesHandler = require('./services_handler.js')

module.exports = React.createClass({displayName: "exports",

    passwordMinLength: 8,
    errorEmail: 'Email address is not valid.',
    errorPasswordsDontMatch: 'The passwords do not match.',
    errorPasswordLength: 'The password must be at least ' +
                          this.passwordMinLength + ' characters.',

    getInitialState: function(){
        return({errorMessage: ''});
    },

    handleSubmit: function(event){
        event.preventDefault()
        var self = this;

        var email = this.refs.email.getInputValue()
        var passwordOne = this.refs.password.getInputValue()
        var passwordTwo = this.refs.confirmPassword.getInputValue()

        var validationResult = this.validate(email, passwordOne, passwordTwo)
        if( validationResult !== true ){
            this.setState({errorMessage: validationResult})
            return;
        }

        servicesHandler.register(this.props.endpoint,
                                 email,
                                 passwordOne,
                                 function(err, response){
            if( err ){
                self.setState({errorMessage: err});
                return;
            }

            self.setState({errorMessage: ''});

            if( self.props.loginCallback ){
                self.props.loginCallback();
            }
        })
    },
    render: function(){
        return(
            React.createElement("div", {className: "sql-login-register"}, 
                React.createElement("div", {className: "sql-login-error-message"}, 
                    this.state.errorMessage
                ), 
                React.createElement("form", {method: "POST", onSubmit: this.handleSubmit}, 
                    React.createElement(FormInput, {
                        name: "email", 
                        type: "text", 
                        label: "Email", 
                        ref: "email"}), 
                    React.createElement(FormInput, {
                        name: "password", 
                        type: "password", 
                        label: "Password", 
                        ref: "password"}), 
                    React.createElement(FormInput, {
                        name: "confirmPassword", 
                        type: "password", 
                        label: "ConfirmPassword", 
                        ref: "confirmPassword"}), 
                    React.createElement("input", {type: "submit", value: "Submit"})
                )
            )
        )
    },
    validate: function(email, passwordOne, passwordTwo){
        if( !validateEmail(email) ){
            return this.errorEmail;
        }
        if( passwordOne !== passwordTwo ){
            return this.errorPasswordsDontMatch;
        }
        if( passwordOne.length < this.passwordMinLength ){
            return this.errorPasswordLength
        }
        return true;
    }
})

// http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

},{"./input.jsx":3,"./services_handler.js":6}],6:[function(require,module,exports){
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

    requestData.xhrFields = {
       withCredentials: true
  };

    requestData.success = function(response){
console.log(response)
        if( response.status === STATUS_SUCCESS ){
            callback();
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

        // $.ajax(
        //     requestData,
        //     success: function(response){
        //         if( response.status === STATUS_SUCCESS ){
        //             callback();
        //         } else if(response.status === STATUS_FAILURE || 
        //                   response.status === STATUS_ERROR ){
        //             callback(response.message);
        //         } else {
        //             callback('An error occurred.');
        //         }
        //     },
        //     error: function( jqXHR, status, errorThrown){
        //         callback('Error contacting server. You might want to try again.');
        //     }
        // })

}

},{}]},{},[1]);
