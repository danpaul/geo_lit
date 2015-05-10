var FormInput = require('./lib/input.jsx');
var LoginForm = require('./lib/login_form.jsx');
var RegisterForm = require('./lib/register_form.jsx');


/**
* Require the following props:
*   endpoint[sql_login endpoint],
*   loginCallback[function called afer login, passed user object]
*   logoutCallback[function called afer logout]
*/
module.exports = React.createClass({
    getInitialState: function(){
        return({
            activeForm: 'register',
            isLoggedIn: false,
            user: null
        });
    },
    handleMenuClickLogin: function(event){
        this.setState({activeForm: 'login'})
    },
    handleMenuClickRegister: function(event){
        this.setState({activeForm: 'register'})
    },
    loginCallback: function(user){
        this.setState({isLoggedIn: true, user: user})
        if( this.props.loginCallback ){
            this.props.loginCallback(user);
        }
    },
    // logoutCallback: function(){

    // },
    render: function(){
        var self = this

        var formVisible = {}
        var forms = ['login', 'register']
        forms.forEach(function(formType){
            formVisible[formType] = (formType === self.state.activeForm);
        })

        return(
            <div className="sql-login-wrap">
                <div className="sql-login-menu">
                    <div
                        className="sql-login-menu-login"
                        onClick={this.handleMenuClickLogin}
                    >Login</div>
                    <div
                        className="sql-login-menu-register"
                        onClick={this.handleMenuClickRegister}
                    >Register</div>
                </div>
                <div style={
                    formVisible['login'] ?
                        {display: 'inherit'} : {display: 'none'}
                }><LoginForm
                    endpoint={this.props.endpoint}
                    loginCallback={this.loginCallback}/></div>
                <div style={
                    formVisible['register'] ?
                        {display: 'inherit'} : {display: 'none'}
                }><RegisterForm
                    endpoint={this.props.endpoint}
                    loginCallback={this.loginCallback} /></div>
            </div>
        )
    }
});