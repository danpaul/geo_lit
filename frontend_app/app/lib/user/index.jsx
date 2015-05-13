var FormInput = require('./lib/input.jsx');
var LoginForm = require('./lib/login_form.jsx');
var RegisterForm = require('./lib/register_form.jsx');
var Modal = require('./lib/modal.jsx');

var LOGIN_BUTTON_STYLE = {
    position: 'absolute',
    top: '5px',
    left: '5px'
}

/**
* Require the following props:
*   endpoint[sql_login endpoint],
*   loginCallback[function called afer login, passed user object]
*   logoutCallback[function called afer logout]
*/
module.exports = React.createClass({
    getInitialState: function(){
        return({
            activeForm: 'login',
            isLoggedIn: false,
            user: null,
            userFormIsVisible: false
        });
    },
    handleClose: function(event){
        this.setState({userFormIsVisible: false});
    },
    handleMenuClickLogin: function(event){
        this.setState({activeForm: 'login'})

    },
    handleMenuClickRegister: function(event){
        this.setState({activeForm: 'register'})
    },
    handleLoginButtonClick: function(event){
        this.setState({userFormIsVisible: true})
    },
    loginCallback: function(user){
        this.setState({isLoggedIn: true, user: user})
        if( this.props.loginCallback ){
            this.props.loginCallback(user);
        }
    },
    render: function(){
        var self = this

        var formVisible = {}
        var forms = ['login', 'register']
        forms.forEach(function(formType){
            formVisible[formType] = (formType === self.state.activeForm);
        })

        return(
            <div className="sql-login-wrap">
                <button
                    className={"sql-login-button button tiny"}
                    style={LOGIN_BUTTON_STYLE}
                    onClick={this.handleLoginButtonClick} >
                    Login
                </button>

                <Modal
                    visible={this.state.userFormIsVisible}
                    handleClose={this.handleClose} >

                    <div
                        id="sql-log-user-modal"
                        aria-labelledby="User"
                    >
                        <div style={
                            formVisible['login'] ?
                                {display: 'inherit'} : {display: 'none'}
                        }>
                            <LoginForm
                                endpoint={this.props.endpoint}
                                loginCallback={this.loginCallback}
                                handleRegisterClick={this.handleMenuClickRegister}
                            />
                        </div>
                        <div style={
                            formVisible['register'] ?
                                {display: 'inherit'} : {display: 'none'}
                        }><RegisterForm
                            endpoint={this.props.endpoint}
                            loginCallback={this.loginCallback}
                            handleLoginClick={this.handleMenuClickLogin} /></div>

                    </div>

                </Modal>
            </div>
        )
    }
});