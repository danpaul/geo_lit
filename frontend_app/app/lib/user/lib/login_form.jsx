var FormInput = require('./input.jsx');
var servicesHandler = require('./services_handler.js')

module.exports = React.createClass({
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
                              function(err, user){
            if( err ){
                self.setState({errorMessage: err});
                return;
            }

            self.setState({errorMessage: ''});

            if( self.props.loginCallback ){
                self.props.loginCallback(user);
            }
        })
    },
    render: function(){
        return(
            <div className="sql-login-login">
                <div className="sql-login-error-message">
                    {this.state.errorMessage}
                </div>
                <form method="POST" onSubmit={this.handleSubmit}>
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
                    <input className={"button tiny"} type="submit" value="Login" />
                    <a
                        style={{ paddingLeft: '12px', fontSize: '10px' }}
                        onClick={this.props.handleRegisterClick} >
                        Register
                    </a>
                </form>
            </div>
        )
    }
})