var FormInput = require('./input.jsx');
var servicesHandler = require('./services_handler.js')

module.exports = React.createClass({

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
            <div className="sql-login-register">
                <div className="sql-login-error-message">
                    {this.state.errorMessage}
                </div>
                <form method="POST" onSubmit={this.handleSubmit} >
                    <FormInput
                        name="email"
                        type="text"
                        label="Email"
                        ref="email"/>
                    <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        ref="password"/>
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        label="ConfirmPassword"
                        ref="confirmPassword"/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
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