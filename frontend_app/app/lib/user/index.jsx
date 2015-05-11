var FormInput = require('./lib/input.jsx');
var LoginForm = require('./lib/login_form.jsx');
var RegisterForm = require('./lib/register_form.jsx');

var LOGIN_BUTTON_STYLE = {
    position: 'absolute',
    top: '5px',
    left: '5px'
}


var Modal = React.createClass({
    getInitialState: function(){

return null;

        // return({
        //     visible: false
        // });
    },
    render: function(){
        containerStyles = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }

        modalStyle = {
            width: '96%',
            margin: '0 auto',
            marginTop: '20px',
            backgroundColor: '#FFF',
            padding: '20px'
        }

        if( !this.props.visible ){
            containerStyles.display = 'none';
        }

        return(
            <div style={containerStyles} >
                <div style={modalStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});


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
    handleLoginButtonClick: function(event){
        $('#sql-log-user-modal').foundation('reveal', 'open');
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
                <button
                    className={"sql-login-button button tiny"}
                    style={LOGIN_BUTTON_STYLE}
                    onClick={this.handleLoginButtonClick} >
                    Login
                </button>

<Modal
    visible={true} >

                    <div
                        id="sql-log-user-modal"
                        className="reveal-modal"
                        data-reveal
                        aria-labelledby="User"
                        aria-hidden="true"
                        role="dialog" >

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

</Modal>

            </div>
        )
    }
});