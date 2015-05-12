var FormInput = require('./lib/input.jsx');
var LoginForm = require('./lib/login_form.jsx');
var RegisterForm = require('./lib/register_form.jsx');

var LOGIN_BUTTON_STYLE = {
    position: 'absolute',
    top: '5px',
    left: '5px'
}


/**
* should pass properites:
*   visible: true/false
*   handleClose: function, should set the Modal's visible property to ralse
*   optionally can take size: small, medium, large
*/
var Modal = React.createClass({
    render: function(){
        var containerStyles = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 100
        }

        var modalStyle = {
            // width: '96%',
            margin: '0 auto',
            marginTop: '20px',
            backgroundColor: '#FFF',
            padding: '20px',
            boxShadow: '0 0 25px #444444'
        }

        var closeButtonContainerStyle = {
            marginTop: '-20px',
            marginLeft: '-10px',
            width: '100%'
        }

        var closeButtonStyle = {
            color: '#000',
            fontWeight: 100,
            fontSize: '30px',
            cursor: 'pointer',
            top: '20px',
            left: '20px'

        }

        var modalSize = this.props.size ? this.props.size : 'small';
        var modalClasses = '';
        if( modalSize === 'small' ){
            modalClasses = 'small-12 medium-6 large-4';
        } else if( modalSize === 'medium' ){
            modalClasses = 'small-12 medium-10 large-8';
        } else {
            modalClasses = 'small-12 medium-10';
        }

        if( !this.props.visible ){
            containerStyles.display = 'none';
        }

        return(
            <div style={containerStyles} className="row" >
                <div style={modalStyle} className={modalClasses}>
                    <div style={closeButtonContainerStyle}>
                        <div
                            style={closeButtonStyle}
                            onClick={this.props.handleClose}
                        >X</div>
                    </div>
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