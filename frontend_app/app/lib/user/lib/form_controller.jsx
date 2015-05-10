// var FormInput = require('./input.jsx');
// var LoginForm = require('./login_form.jsx');
// var RegisterForm = require('./register_form.jsx');

// module.exports = React.createClass({
//     getInitialState: function(){
//         return({ activeForm: 'register' })
//     },
//     handleMenuClickLogin: function(event){
//         this.setState({activeForm: 'login'})
//     },
//     handleMenuClickRegister: function(event){
//         this.setState({activeForm: 'register'})
//     },
//     render: function(){
//         var self = this

//         var formVisible = {}
//         var test = ['login', 'register']
//         test.forEach(function(formType){
//             formVisible[formType] = (formType === self.state.activeForm);
//         })

//         return(
//             <div className="sql-login-wrap">
//                 <div className="sql-login-menu">
//                     <div
//                         className="sql-login-menu-login"
//                         onClick={this.handleMenuClickLogin}
//                     >Login</div>
//                     <div
//                         className="sql-login-menu-register"
//                         onClick={this.handleMenuClickRegister}
//                     >Register</div>
//                 </div>
//                 <div style={
//                     formVisible['login'] ?
//                         {display: 'inherit'} : {display: 'none'}
//                 }><LoginForm
//                     endpoint={this.props.endpoint}
//                     loginCallback={this.props.loginCallback}/></div>
//                 <div style={
//                     formVisible['register'] ?
//                         {display: 'inherit'} : {display: 'none'}
//                 }><RegisterForm
//                     endpoint={this.props.endpoint}
//                     loginCallback={this.props.loginCallback} /></div>
//             </div>
//         )
//     }
// })