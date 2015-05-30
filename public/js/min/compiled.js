!function e(t,n,r){function a(i,s){if(!n[i]){if(!t[i]){var l="function"==typeof require&&require;if(!s&&l)return l(i,!0);if(o)return o(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[i]={exports:{}};t[i][0].call(u.exports,function(e){var n=t[i][1][e];return a(n?n:e)},u,u.exports,e,t,n,r)}return n[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)a(r[i]);return a}({1:[function(e,t,n){var r=e("./lib/user/lib/modal.jsx"),a="map-canvas",o=e("./lib/geo_lit"),i=e("../config");o.init(a,function(e){console.log(e?e:"map initialzed")});var s=e("./components/addPlaceForm.jsx"),l=e("./components/comments.jsx"),c=e("./lib/user/index.jsx"),u=React.createClass({displayName:"Main",addPlaceCallback:function(e){var t=this;t.setState({activeComponent:"comments",placeId:e._id,placeTitle:e.title})},componentDidMount:function(){var e=this;$(document).on("geo-lit-place-click",function(t,n){e.setState({activeComponent:"comments",placeId:n._id,placeTitle:n.title})})},getInitialState:function(){return{activeComponent:"addPlaceForm",placeId:null,userId:null,user:null,isLoggedIn:!1}},handleCommentModalClose:function(){this.setState({activeComponent:null})},loginCallback:function(e){this.setState({user:e,userId:e.id,isLoggedIn:!0})},logoutCallback:function(){this.setState({user:null,userId:null,isLoggedIn:!1})},render:function(){var e=this,t=null;e.state.isLoggedIn&&(t=React.createElement(s,{activeComponent:e.state.activeComponent,addPlaceCallback:e.addPlaceCallback}));var n=null;return"comments"===this.state.activeComponent&&(n=React.createElement(r,{handleClose:this.handleCommentModalClose,size:"large",visible:!0},React.createElement("h2",null,this.state.placeTitle),React.createElement(l,{activeComponent:this.state.activeComponent,endpoint:i.commentEndpoint,placeId:this.state.placeId,placeTitle:this.state.placeTitle,userId:this.state.userId}))),React.createElement("div",null,React.createElement(c,{endpoint:i.userEndpoint,loginCallback:this.loginCallback,logoutCallback:this.logoutCallback}),t,n)}});React.render(React.createElement(u,null),document.getElementById("content"))},{"../config":13,"./components/addPlaceForm.jsx":2,"./components/comments.jsx":3,"./lib/geo_lit":4,"./lib/user/index.jsx":6,"./lib/user/lib/modal.jsx":10}],2:[function(e,t,n){var r=(e("../lib/services.js"),e("../lib/geo_lit.js")),a=e("../lib/user/lib/modal.jsx"),o=e("../lib/user/lib/alert.jsx"),i="Place title is not long enough.",s={position:"absolute",top:"5px",left:"5px"};t.exports=React.createClass({displayName:"exports",validation:{minPlaceLength:4},addPlace:function(e){var t=this;e.preventDefault();var n=this.state.placeValue,a=this.validatePlace(n);return a!==!0?void t.setState({errorMessage:a}):void r.addPlace(this.state.placeValue,function(e,n){e?t.setState({errorMessage:e}):t.props.addPlaceCallback&&t.setState({errorMessage:"",placeValue:"",modalVisible:!1},function(){t.props.addPlaceCallback&&t.props.addPlaceCallback(n)})})},getInitialState:function(){return{placeValue:"",errorMessage:"",modalVisible:!1}},handleModalClose:function(){this.setState({modalVisible:!1})},handleShowFormClick:function(e){this.setState({modalVisible:!0})},validatePlace:function(e){return e.trim().length<this.validation.minPlaceLength?i:!0},render:function(){var e=this,t="js-add-place button expand";return""!==e.props.activeComponent?React.createElement("div",null,React.createElement("button",{className:"sql-login-button button tiny",style:s,onClick:this.handleShowFormClick},"Add Place"),React.createElement(a,{visible:this.state.modalVisible,handleClose:this.handleModalClose},React.createElement(o,{message:this.state.errorMessage}),React.createElement("form",null,React.createElement("div",{className:"row"},React.createElement("div",{className:"small-12 columns"},React.createElement("input",{type:"text",name:"title",placeholder:"Title",value:this.state.placeValue,onChange:this.updatePlaceValue}),React.createElement("a",{href:"javascript:void(0)",onClick:this.addPlace,className:t},"Add Place")))))):void 0},updatePlaceValue:function(e){this.setState({placeValue:e.target.value})}})},{"../lib/geo_lit.js":4,"../lib/services.js":5,"../lib/user/lib/alert.jsx":7,"../lib/user/lib/modal.jsx":10}],3:[function(e,t,n){var r=e("underscore"),a="A server error occurred.";t.exports=React.createClass({displayName:"exports",addComment:function(e,t){var n=this,r=n.props.endpoint+"/comment/"+n.props.placeId+"/"+e;$.ajax({type:"POST",url:r,data:{comment:t},success:function(e){"success"!==e.status?n.triggerNotice(e.errorMessage):(n.setState({hasLoaded:!1}),n.loadComments(n.props.placeId))},error:function(e){console.log(e),n.triggerNotice(a)},dataType:"JSON"})},handleFlag:function(e){var t=this,n=t.props.endpoint+"/flag/"+e;$.ajax({type:"POST",url:n,success:function(e){t.triggerNotice("success"!==e.status?e.errorMessage:"Comment Flagged")},error:function(e){t.triggerNotice(a)},dataType:"JSON"})},handleVote:function(e,t){var n=this,r=n.props.endpoint+"/comment/vote/"+e+"/"+t;$.ajax({type:"POST",url:r,success:function(e){n.triggerNotice("success"!==e.status?e.errorMessage:"Vote Added")},error:function(e){n.triggerNotice(a)},dataType:"JSON"})},cleanComments:function(e){var t=this;r.each(e,function(e){e.addComment=t.addComment,e.handleVote=t.handleVote,e.handleFlag=t.handleFlag,0!==e.children.length&&t.cleanComments(e.children)})},componentDidMount:function(){this.loadComments(this.props.placeId)},componentWillReceiveProps:function(e){e.placeId!==this.props.placeId&&(this.loadComments(e.placeId),this.setState({hasLoaded:!1}))},getInitialState:function(){return{hasLoaded:!1,comments:[],notice:null}},triggerNotice:function(e){var t=this,n=React.createElement("div",{style:{position:"fixed",top:"10px",right:"10px"},className:"alert-box alert"},e);t.setState({notice:n},function(){setTimeout(function(){t.setState({notice:null})},2e3)})},loadComments:function(e){var t=this;$.ajax({type:"GET",url:t.props.endpoint+"/comments-formatted/"+e,success:function(e){"success"!==e.status?(console.log(e),t.triggerNotice(e.errorMessage)):(t.cleanComments(e.data),t.setState({comments:e.data,hasLoaded:!0}))},error:function(e){console.log(e),t.triggerNotice(a)},dataType:"JSON"})},render:function(){var e=this;return this.state.hasLoaded?React.createElement("div",null,e.state.notice,React.createElement(i,{children:[],isTopLevel:!0,addComment:this.addComment}),React.createElement(o,{comments:this.state.comments})):null},updatePlaceValue:function(e){this.setState({placeValue:e.target.value})}});var o=React.createClass({displayName:"Comments",render:function(){var e=this.props.comments.map(function(e,t){var n=!1;null===e.comment&&(n=!0);var r="";return 0!==e.children.length&&(r=React.createElement(o,{comments:e.children})),React.createElement(i,{addComment:e.addComment,children:e.children,childrenElement:r,comment:e.comment,created:e.created,handleVote:e.handleVote,handleFlag:e.handleFlag,id:e.id,isTopLevel:!1,key:t,rank:e.rank})});return React.createElement("div",null,e)},updateComment:function(e){this.setState({comment:e.target.value})}}),i=React.createClass({displayName:"Comment",getInitialState:function(){return{comment:"",showCommentForm:!1,showControls:!1,showChildren:!0}},handleCancel:function(){this.setState({showCommentForm:!1})},handleShowControl:function(){this.setState({showControls:!this.state.showControls})},handleSubmit:function(){event.preventDefault(),this.props.addComment(this.props.id,this.state.comment)},handleToggleChilren:function(){var e=!this.state.showChildren;this.setState({showChildren:e,showControls:!1})},handleToggleCommentForm:function(){var e=!this.state.showCommentForm;this.setState({showCommentForm:e})},handleUpvote:function(){this.props.handleVote("up",this.props.id)},handleFlag:function(){this.props.handleFlag(this.props.id)},handleDownvote:function(){this.props.handleVote("down",this.props.id)},render:function(){var e=this,t=this.state.showCommentForm&&this.state.showControls?{display:"block",marginTop:"10px"}:{display:"none"};e.props.isTopLevel&&(t={display:"block",marginTop:"10px"});var n=(e.state.showChildren?"-":"+",e.state.showChildren?{display:"block"}:{display:"none"}),r=(0===e.props.children.length?{display:"none"}:{display:"block"},e.props.rank?e.props.rank:0),a=new Date(1e3*e.props.created).toString(),o=this.props.children.length>0;return React.createElement("div",{className:"sql-comment-container",style:{marginTop:"10px"}},React.createElement("div",{className:"sql-comment-comment-meta",style:e.props.isTopLevel?{display:"none"}:{marginTop:"10px"}},React.createElement("span",{className:"sql-comment-username"},"danpaul")," -",React.createElement("span",{className:"sql-comment-date"}," ",a)," -",React.createElement("span",{style:{marginLeft:"3px",position:"relative",top:"1px"}},r)),React.createElement("div",{style:{cursor:"pointer"},onClick:e.handleShowControl},this.props.comment),React.createElement("div",{style:this.state.showControls?{display:"block"}:{display:"none"}}),React.createElement("div",{style:this.state.showControls?{display:"block"}:{display:"none"}},React.createElement("a",{onClick:this.handleUpvote},"upvote")," - ",React.createElement("a",{onClick:this.handleDownvote},"downvote")," - ",React.createElement("a",{onClick:this.handleFlag},"flag")," - ",React.createElement("a",{onClick:this.handleToggleCommentForm},"comment"),React.createElement("span",{style:o?{display:"inline"}:{display:"none"}}," - ",React.createElement("a",{onClick:this.handleToggleChilren},this.state.showChildren?"collapse":"reveal"))),React.createElement("div",{style:t},React.createElement("textarea",{placeholder:"Add Comment",onChange:e.updateComment,value:e.state.comment}),React.createElement("button",{href:"javascript:null;",className:"button small",onClick:e.handleSubmit},"Submit"),React.createElement("button",{href:"javascript:null;",className:"button small inverted left-padded",onClick:e.handleCancel},"Cancel")),React.createElement("div",{style:n},this.props.childrenElement))},updateComment:function(e){this.setState({comment:e.target.value})}})},{underscore:14}],4:[function(e,t,n){var r={},a=e("underscore"),o=e("./services"),i=5,s=!1,l=.1;r.map=null,r.currentLatitude=null,r.currentLongitude=null,r.mapFollow=!0,r.intervalId=null,r.intervalTime=5e3,r.mapId=null,r.placeMarkers={},r.userMarker=null,r.zoomLevel=12,r.createMap=function(){var e={zoom:r.zoomLevel,disableDefaultUI:!0,center:new google.maps.LatLng(r.currentLatitude,r.currentLongitude)};r.map=new google.maps.Map(document.getElementById(r.mapId),e)},r.getPosition=function(e){navigator.geolocation.getCurrentPosition(function(t){e(null,{latitude:t.coords.latitude,longitude:t.coords.longitude})},e)},r.init=function(e,t){r.mapId=e,google.maps.event.addDomListener(window,"load",function(){r.updatePosition(function(e){e?t(e):(r.createMap(),r.updateUserMarker(),r.intervalId=window.setInterval(r.intervalCallback,r.intervalTime),t())})})},r.updatePosition=function(e){navigator.geolocation.getCurrentPosition(function(t){r.currentLatitude=t.coords.latitude,r.currentLongitude=t.coords.longitude,e()},e)},r.addPlacesToMap=function(e){a.each(e,function(e){var t=new google.maps.LatLng(e.location[1],e.location[0]);r.placeMarkers[e._id]=new google.maps.Marker({position:t,map:r.map,title:"TEST TITLE",geoLit:{_id:e._id,title:"TEST TITLE"}}),google.maps.event.addListener(r.placeMarkers[e._id],"click",function(){console.log("here"),$(document).trigger("geo-lit-place-click",[this.geoLit])})})},r.updatePlaces=function(e){o.findNear({latitude:r.currentLatitude,longitude:r.currentLongitude,range:i},function(e,t){var n=a.filter(t,function(e){return"undefined"==typeof r.placeMarkers[e._id]});r.addPlacesToMap(n)})},r.updateUserMarker=function(){null!==r.userMarker&&r.userMarker.setMap(null);var e=new google.maps.LatLng(r.currentLatitude+.002,r.currentLongitude+.002);r.userMarker=new google.maps.Marker({position:e,map:r.map,title:"Current Position"}),r.mapFollow&&r.recenterMap()},r.recenterMap=function(){var e=new google.maps.LatLng(r.currentLatitude,r.currentLongitude);r.map.panTo(e)},r.intervalCallback=function(){var e=!0;r.updatePosition(function(t){return s&&(r.currentLatitude+=Math.random()*l,r.currentLongitude+=Math.random()*l),t?void console.log(t):(r.updateUserMarker(),void(e&&r.updatePlaces(function(e){e&&console.log(e)})))})},r.addPlace=function(e,t){r.getPosition(function(n,r){if(n)return void t("Unable to find location.");var a={};a.location=[r.longitude,r.latitude],a.title=e,a.user=user.id,o.add(a,function(e,n){e?t(e):t(null,n)})})},t.exports=r},{"./services":5,underscore:14}],5:[function(e,t,n){var r={},a=e("../../config.js"),o="A server error occurred.";r.add=function(e,t){$.ajax({type:"POST",url:a.geoLitEndpoint+"/position",data:e,success:function(e){"success"===e.status?t(null,e.data):t(data.errorMessage)},error:function(e){console.log(e),t(o)},dataType:"JSON"})},r.findNear=function(e,t){$.ajax({type:"GET",url:a.geoLitEndpoint+"/positions-near",data:e,success:function(e){"success"!==e.status?t(e.errorMessage):t(null,e.data)},error:function(e){console.log(e),t(o)},dataType:"JSON"})},t.exports=r},{"../../config.js":13}],6:[function(e,t,n){var r=(e("./lib/input.jsx"),e("./lib/login_form.jsx")),a=e("./lib/register_form.jsx"),o=e("./lib/modal.jsx"),i=e("./lib/services_handler.js"),s={position:"absolute",top:"5px",right:"5px"};t.exports=React.createClass({displayName:"exports",getInitialState:function(){return this.loadUser(),{activeForm:"login",isLoggedIn:!1,user:null,userFormIsVisible:!1,hasLoaded:!1}},handleClose:function(e){this.setState({userFormIsVisible:!1})},handleMenuClickLogin:function(e){this.setState({activeForm:"login"})},handleMenuClickRegister:function(e){this.setState({activeForm:"register"})},handleLoginButtonClick:function(e){var t=this;return t.state.isLoggedIn?void i.logout(t.props.endpoint,function(e){return e?void alert(e):void t.setState({isLoggedIn:!1},function(){t.props.logoutCallback&&t.props.logoutCallback()})}):void t.setState({userFormIsVisible:!0})},loadUser:function(){var e=this;i.getUser(e.props.endpoint,function(t,n){return t?(console.log(t),void e.setState({hasLoaded:!0})):void e.setState({isLoggedIn:!0,user:n,hasLoaded:!0},function(){e.props.loginCallback&&e.props.loginCallback(n)})})},loginCallback:function(e){var t=this;t.setState({isLoggedIn:!0,user:e,userFormIsVisible:!1},function(){t.props.loginCallback&&t.props.loginCallback(e)})},render:function(){var e=this;if(!e.state.hasLoaded)return null;var t={},n=["login","register"];return n.forEach(function(n){t[n]=n===e.state.activeForm}),React.createElement("div",{className:"sql-login-wrap"},React.createElement("button",{className:"sql-login-button button tiny",style:s,onClick:this.handleLoginButtonClick},this.state.isLoggedIn?"Logout":"Login"),React.createElement(o,{visible:this.state.userFormIsVisible,handleClose:this.handleClose},React.createElement("div",{id:"sql-log-user-modal","aria-labelledby":"User"},React.createElement("div",{style:t.login?{display:"inherit"}:{display:"none"}},React.createElement(r,{endpoint:this.props.endpoint,loginCallback:this.loginCallback,handleRegisterClick:this.handleMenuClickRegister})),React.createElement("div",{style:t.register?{display:"inherit"}:{display:"none"}},React.createElement(a,{endpoint:this.props.endpoint,loginCallback:this.loginCallback,handleLoginClick:this.handleMenuClickLogin})))))}})},{"./lib/input.jsx":8,"./lib/login_form.jsx":9,"./lib/modal.jsx":10,"./lib/register_form.jsx":11,"./lib/services_handler.js":12}],7:[function(e,t,n){t.exports=React.createClass({displayName:"exports",defaultStyles:{},render:function(){if(""===this.props.message)return null;var e=this.props.styles?this.props.styles:this.defaultStyles;return React.createElement("div",{className:"alert-box alert",style:e},this.props.message)}})},{}],8:[function(e,t,n){t.exports=React.createClass({displayName:"exports",getInitialState:function(){return{value:""}},getInputValue:function(){return this.state.value},handleChange:function(e){this.setState({value:e.target.value})},render:function(){return React.createElement("div",null,React.createElement("label",null,this.props.label),React.createElement("input",{type:this.props.type,name:this.props.name,ref:this.props.ref,value:this.state.value,onChange:this.handleChange}))}})},{}],9:[function(e,t,n){var r=e("./input.jsx"),a=e("./alert.jsx"),o=e("./services_handler.js");t.exports=React.createClass({displayName:"exports",getInitialState:function(){return{errorMessage:""}},handleSubmit:function(e){e.preventDefault();var t=this,n=this.refs.email.getInputValue(),r=this.refs.password.getInputValue();o.login(this.props.endpoint,n,r,function(e,n){return e?(console.log(e),void t.setState({errorMessage:e})):(t.setState({errorMessage:""}),void(t.props.loginCallback&&t.props.loginCallback(n)))})},render:function(){return React.createElement("div",{className:"sql-login-login"},React.createElement(a,{message:this.state.errorMessage}),React.createElement("form",{method:"POST",onSubmit:this.handleSubmit},React.createElement(r,{name:"email",type:"text",label:"Email",ref:"email"}),React.createElement(r,{name:"password",type:"password",label:"Password",ref:"password"}),React.createElement("input",{className:"button tiny",type:"submit",value:"Login"}),React.createElement("a",{style:{paddingLeft:"12px",fontSize:"10px"},onClick:this.props.handleRegisterClick},"Register")))}})},{"./alert.jsx":7,"./input.jsx":8,"./services_handler.js":12}],10:[function(e,t,n){t.exports=React.createClass({displayName:"exports",render:function(){var e={position:"absolute",width:"100%",height:"100%",top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.3)",zIndex:100},t=.92*window.innerHeight,n={margin:"0 auto",marginTop:"20px",backgroundColor:"#FFF",padding:"20px",boxShadow:"0 0 25px #444444",overflow:"scroll",maxHeight:t},r={marginTop:"-20px",marginLeft:"-10px",width:"100%"},a={color:"#000",fontWeight:100,fontSize:"30px",cursor:"pointer",top:"20px",left:"20px"},o=this.props.size?this.props.size:"small",i="";return i="small"===o?"small-12 medium-8 large-6":"medium"===o?"small-12 medium-10 large-8":"small-12 medium-10",this.props.visible||(e.display="none"),React.createElement("div",{style:e},React.createElement("div",{className:"row"},React.createElement("div",{style:n,className:i},React.createElement("div",{style:r},React.createElement("div",{style:a,onClick:this.props.handleClose},"X")),this.props.children)))}})},{}],11:[function(e,t,n){function r(e,t){return e.length<t?!1:/^([a-zA-Z0-9]|\-|\_|\.)+$/.test(e)}function a(e){var t=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return t.test(e)}var o=e("./alert.jsx"),i=e("./input.jsx"),s=e("./services_handler.js");t.exports=React.createClass({displayName:"exports",passwordMinLength:8,usernameMinLength:3,errorEmail:"Email address is not valid.",errorPasswordsDontMatch:"The passwords do not match.",errorPasswordLength:"The password must be at least 8 characters.",errorUsernameLength:"The username can only contain letters, numbers, underscores, dots and dashes and must be at least 3 characters.",getInitialState:function(){return{errorMessage:""}},handleSubmit:function(e){e.preventDefault();var t=this,n=this.refs.email.getInputValue(),r=this.refs.username.getInputValue(),a=this.refs.password.getInputValue(),o=this.refs.confirmPassword.getInputValue(),i=this.validate(n,r,a,o);return i!==!0?void this.setState({errorMessage:i}):(console.log("Registering "+n),void s.register(this.props.endpoint,n,r,a,function(e,n){return e?(console.log(e),void t.setState({errorMessage:e})):(console.log(n),t.setState({errorMessage:""}),void(t.props.loginCallback&&t.props.loginCallback()))}))},render:function(){return React.createElement("div",{className:"sql-login-register"},React.createElement(o,{message:this.state.errorMessage}),React.createElement("form",{method:"POST",onSubmit:this.handleSubmit},React.createElement(i,{name:"email",type:"text",label:"Email",ref:"email"}),React.createElement(i,{name:"username",type:"text",label:"Username",ref:"username"}),React.createElement(i,{name:"password",type:"password",label:"Password",ref:"password"}),React.createElement(i,{name:"confirmPassword",type:"password",label:"ConfirmPassword",ref:"confirmPassword"}),React.createElement("input",{className:"button tiny",type:"submit",value:"Register"}),React.createElement("a",{style:{paddingLeft:"12px",fontSize:"10px"},onClick:this.props.handleLoginClick},"Login")))},validate:function(e,t,n,o){return a(e)?r(t,this.usernameMinLength)?n!==o?this.errorPasswordsDontMatch:n.length<this.passwordMinLength?this.errorPasswordLength:!0:this.errorUsernameLength:this.errorEmail}})},{"./alert.jsx":7,"./input.jsx":8,"./services_handler.js":12}],12:[function(e,t,n){var r="success",a="failure",o="error";t.exports={getUser:function(e,t){i({method:"GET",url:e},t)},register:function(e,t,n,r,a){i({method:"POST",url:e+"/register",data:{email:t,username:n,password:r}},a)},login:function(e,t,n,r){i({method:"POST",url:e+"/login",data:{email:t,password:n}},r)},logout:function(e,t){i({method:"POST",url:e+"/logout"},t)}};var i=function(e,t){e.success=function(e){e.status===r?t(null,e.data):t(e.status===a||e.status===o?e.message:"An error occurred.")},e.error=function(e,n,r){t("Error contacting server. You might want to try again.")},$.ajax(e)}},{}],13:[function(e,t,n){var r={};r.environment=-1!==window.location.href.toLowerCase().indexOf("localhost")?"development":"production","development"===r.environment&&(r.geoLitEndpoint="http://localhost:3000"),r.commentEndpoint=r.geoLitEndpoint+"/discussion",r.userEndpoint=r.geoLitEndpoint+"/user",t.exports=r},{}],14:[function(e,t,n){(function(){function e(e){function t(t,n,r,a,o,i){for(;o>=0&&i>o;o+=e){var s=a?a[o]:o;r=n(r,t[s],s,t)}return r}return function(n,r,a,o){r=x(r,o,4);var i=!L(n)&&C.keys(n),s=(i||n).length,l=e>0?0:s-1;return arguments.length<3&&(a=n[i?i[l]:l],l+=e),t(n,r,a,i,l,s)}}function r(e){return function(t,n,r){n=w(n,r);for(var a=j(t),o=e>0?0:a-1;o>=0&&a>o;o+=e)if(n(t[o],o,t))return o;return-1}}function a(e,t,n){return function(r,a,o){var i=0,s=j(r);if("number"==typeof o)e>0?i=o>=0?o:Math.max(o+s,i):s=o>=0?Math.min(o+1,s):o+s+1;else if(n&&o&&s)return o=n(r,a),r[o]===a?o:-1;if(a!==a)return o=t(d.call(r,i,s),C.isNaN),o>=0?o+i:-1;for(o=e>0?i:s-1;o>=0&&s>o;o+=e)if(r[o]===a)return o;return-1}}function o(e,t){var n=N.length,r=e.constructor,a=C.isFunction(r)&&r.prototype||c,o="constructor";for(C.has(e,o)&&!C.contains(t,o)&&t.push(o);n--;)o=N[n],o in e&&e[o]!==a[o]&&!C.contains(t,o)&&t.push(o)}var i=this,s=i._,l=Array.prototype,c=Object.prototype,u=Function.prototype,p=l.push,d=l.slice,f=c.toString,m=c.hasOwnProperty,h=Array.isArray,g=Object.keys,v=u.bind,y=Object.create,b=function(){},C=function(e){return e instanceof C?e:this instanceof C?void(this._wrapped=e):new C(e)};"undefined"!=typeof n?("undefined"!=typeof t&&t.exports&&(n=t.exports=C),n._=C):i._=C,C.VERSION="1.8.3";var x=function(e,t,n){if(void 0===t)return e;switch(null==n?3:n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,a){return e.call(t,n,r,a)};case 4:return function(n,r,a,o){return e.call(t,n,r,a,o)}}return function(){return e.apply(t,arguments)}},w=function(e,t,n){return null==e?C.identity:C.isFunction(e)?x(e,t,n):C.isObject(e)?C.matcher(e):C.property(e)};C.iteratee=function(e,t){return w(e,t,1/0)};var E=function(e,t){return function(n){var r=arguments.length;if(2>r||null==n)return n;for(var a=1;r>a;a++)for(var o=arguments[a],i=e(o),s=i.length,l=0;s>l;l++){var c=i[l];t&&void 0!==n[c]||(n[c]=o[c])}return n}},k=function(e){if(!C.isObject(e))return{};if(y)return y(e);b.prototype=e;var t=new b;return b.prototype=null,t},R=function(e){return function(t){return null==t?void 0:t[e]}},S=Math.pow(2,53)-1,j=R("length"),L=function(e){var t=j(e);return"number"==typeof t&&t>=0&&S>=t};C.each=C.forEach=function(e,t,n){t=x(t,n);var r,a;if(L(e))for(r=0,a=e.length;a>r;r++)t(e[r],r,e);else{var o=C.keys(e);for(r=0,a=o.length;a>r;r++)t(e[o[r]],o[r],e)}return e},C.map=C.collect=function(e,t,n){t=w(t,n);for(var r=!L(e)&&C.keys(e),a=(r||e).length,o=Array(a),i=0;a>i;i++){var s=r?r[i]:i;o[i]=t(e[s],s,e)}return o},C.reduce=C.foldl=C.inject=e(1),C.reduceRight=C.foldr=e(-1),C.find=C.detect=function(e,t,n){var r;return r=L(e)?C.findIndex(e,t,n):C.findKey(e,t,n),void 0!==r&&-1!==r?e[r]:void 0},C.filter=C.select=function(e,t,n){var r=[];return t=w(t,n),C.each(e,function(e,n,a){t(e,n,a)&&r.push(e)}),r},C.reject=function(e,t,n){return C.filter(e,C.negate(w(t)),n)},C.every=C.all=function(e,t,n){t=w(t,n);for(var r=!L(e)&&C.keys(e),a=(r||e).length,o=0;a>o;o++){var i=r?r[o]:o;if(!t(e[i],i,e))return!1}return!0},C.some=C.any=function(e,t,n){t=w(t,n);for(var r=!L(e)&&C.keys(e),a=(r||e).length,o=0;a>o;o++){var i=r?r[o]:o;if(t(e[i],i,e))return!0}return!1},C.contains=C.includes=C.include=function(e,t,n,r){return L(e)||(e=C.values(e)),("number"!=typeof n||r)&&(n=0),C.indexOf(e,t,n)>=0},C.invoke=function(e,t){var n=d.call(arguments,2),r=C.isFunction(t);return C.map(e,function(e){var a=r?t:e[t];return null==a?a:a.apply(e,n)})},C.pluck=function(e,t){return C.map(e,C.property(t))},C.where=function(e,t){return C.filter(e,C.matcher(t))},C.findWhere=function(e,t){return C.find(e,C.matcher(t))},C.max=function(e,t,n){var r,a,o=-(1/0),i=-(1/0);if(null==t&&null!=e){e=L(e)?e:C.values(e);for(var s=0,l=e.length;l>s;s++)r=e[s],r>o&&(o=r)}else t=w(t,n),C.each(e,function(e,n,r){a=t(e,n,r),(a>i||a===-(1/0)&&o===-(1/0))&&(o=e,i=a)});return o},C.min=function(e,t,n){var r,a,o=1/0,i=1/0;if(null==t&&null!=e){e=L(e)?e:C.values(e);for(var s=0,l=e.length;l>s;s++)r=e[s],o>r&&(o=r)}else t=w(t,n),C.each(e,function(e,n,r){a=t(e,n,r),(i>a||a===1/0&&o===1/0)&&(o=e,i=a)});return o},C.shuffle=function(e){for(var t,n=L(e)?e:C.values(e),r=n.length,a=Array(r),o=0;r>o;o++)t=C.random(0,o),t!==o&&(a[o]=a[t]),a[t]=n[o];return a},C.sample=function(e,t,n){return null==t||n?(L(e)||(e=C.values(e)),e[C.random(e.length-1)]):C.shuffle(e).slice(0,Math.max(0,t))},C.sortBy=function(e,t,n){return t=w(t,n),C.pluck(C.map(e,function(e,n,r){return{value:e,index:n,criteria:t(e,n,r)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(r>n||void 0===r)return-1}return e.index-t.index}),"value")};var M=function(e){return function(t,n,r){var a={};return n=w(n,r),C.each(t,function(r,o){var i=n(r,o,t);e(a,r,i)}),a}};C.groupBy=M(function(e,t,n){C.has(e,n)?e[n].push(t):e[n]=[t]}),C.indexBy=M(function(e,t,n){e[n]=t}),C.countBy=M(function(e,t,n){C.has(e,n)?e[n]++:e[n]=1}),C.toArray=function(e){return e?C.isArray(e)?d.call(e):L(e)?C.map(e,C.identity):C.values(e):[]},C.size=function(e){return null==e?0:L(e)?e.length:C.keys(e).length},C.partition=function(e,t,n){t=w(t,n);var r=[],a=[];return C.each(e,function(e,n,o){(t(e,n,o)?r:a).push(e)}),[r,a]},C.first=C.head=C.take=function(e,t,n){return null==e?void 0:null==t||n?e[0]:C.initial(e,e.length-t)},C.initial=function(e,t,n){return d.call(e,0,Math.max(0,e.length-(null==t||n?1:t)))},C.last=function(e,t,n){return null==e?void 0:null==t||n?e[e.length-1]:C.rest(e,Math.max(0,e.length-t))},C.rest=C.tail=C.drop=function(e,t,n){return d.call(e,null==t||n?1:t)},C.compact=function(e){return C.filter(e,C.identity)};var I=function(e,t,n,r){for(var a=[],o=0,i=r||0,s=j(e);s>i;i++){var l=e[i];if(L(l)&&(C.isArray(l)||C.isArguments(l))){t||(l=I(l,t,n));var c=0,u=l.length;for(a.length+=u;u>c;)a[o++]=l[c++]}else n||(a[o++]=l)}return a};C.flatten=function(e,t){return I(e,t,!1)},C.without=function(e){return C.difference(e,d.call(arguments,1))},C.uniq=C.unique=function(e,t,n,r){C.isBoolean(t)||(r=n,n=t,t=!1),null!=n&&(n=w(n,r));for(var a=[],o=[],i=0,s=j(e);s>i;i++){var l=e[i],c=n?n(l,i,e):l;t?(i&&o===c||a.push(l),o=c):n?C.contains(o,c)||(o.push(c),a.push(l)):C.contains(a,l)||a.push(l)}return a},C.union=function(){return C.uniq(I(arguments,!0,!0))},C.intersection=function(e){for(var t=[],n=arguments.length,r=0,a=j(e);a>r;r++){var o=e[r];if(!C.contains(t,o)){for(var i=1;n>i&&C.contains(arguments[i],o);i++);i===n&&t.push(o)}}return t},C.difference=function(e){var t=I(arguments,!0,!0,1);return C.filter(e,function(e){return!C.contains(t,e)})},C.zip=function(){return C.unzip(arguments)},C.unzip=function(e){for(var t=e&&C.max(e,j).length||0,n=Array(t),r=0;t>r;r++)n[r]=C.pluck(e,r);return n},C.object=function(e,t){for(var n={},r=0,a=j(e);a>r;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},C.findIndex=r(1),C.findLastIndex=r(-1),C.sortedIndex=function(e,t,n,r){n=w(n,r,1);for(var a=n(t),o=0,i=j(e);i>o;){var s=Math.floor((o+i)/2);n(e[s])<a?o=s+1:i=s}return o},C.indexOf=a(1,C.findIndex,C.sortedIndex),C.lastIndexOf=a(-1,C.findLastIndex),C.range=function(e,t,n){null==t&&(t=e||0,e=0),n=n||1;for(var r=Math.max(Math.ceil((t-e)/n),0),a=Array(r),o=0;r>o;o++,e+=n)a[o]=e;return a};var T=function(e,t,n,r,a){if(!(r instanceof t))return e.apply(n,a);var o=k(e.prototype),i=e.apply(o,a);return C.isObject(i)?i:o};C.bind=function(e,t){if(v&&e.bind===v)return v.apply(e,d.call(arguments,1));if(!C.isFunction(e))throw new TypeError("Bind must be called on a function");var n=d.call(arguments,2),r=function(){return T(e,r,t,this,n.concat(d.call(arguments)))};return r},C.partial=function(e){var t=d.call(arguments,1),n=function(){for(var r=0,a=t.length,o=Array(a),i=0;a>i;i++)o[i]=t[i]===C?arguments[r++]:t[i];for(;r<arguments.length;)o.push(arguments[r++]);return T(e,n,this,this,o)};return n},C.bindAll=function(e){var t,n,r=arguments.length;if(1>=r)throw new Error("bindAll must be passed function names");for(t=1;r>t;t++)n=arguments[t],e[n]=C.bind(e[n],e);return e},C.memoize=function(e,t){var n=function(r){var a=n.cache,o=""+(t?t.apply(this,arguments):r);return C.has(a,o)||(a[o]=e.apply(this,arguments)),a[o]};return n.cache={},n},C.delay=function(e,t){var n=d.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},C.defer=C.partial(C.delay,C,1),C.throttle=function(e,t,n){var r,a,o,i=null,s=0;n||(n={});var l=function(){s=n.leading===!1?0:C.now(),i=null,o=e.apply(r,a),i||(r=a=null)};return function(){var c=C.now();s||n.leading!==!1||(s=c);var u=t-(c-s);return r=this,a=arguments,0>=u||u>t?(i&&(clearTimeout(i),i=null),s=c,o=e.apply(r,a),i||(r=a=null)):i||n.trailing===!1||(i=setTimeout(l,u)),o}},C.debounce=function(e,t,n){var r,a,o,i,s,l=function(){var c=C.now()-i;t>c&&c>=0?r=setTimeout(l,t-c):(r=null,n||(s=e.apply(o,a),r||(o=a=null)))};return function(){o=this,a=arguments,i=C.now();var c=n&&!r;return r||(r=setTimeout(l,t)),c&&(s=e.apply(o,a),o=a=null),s}},C.wrap=function(e,t){return C.partial(t,e)},C.negate=function(e){return function(){return!e.apply(this,arguments)}},C.compose=function(){var e=arguments,t=e.length-1;return function(){for(var n=t,r=e[t].apply(this,arguments);n--;)r=e[n].call(this,r);return r}},C.after=function(e,t){return function(){return--e<1?t.apply(this,arguments):void 0}},C.before=function(e,t){var n;return function(){return--e>0&&(n=t.apply(this,arguments)),1>=e&&(t=null),n}},C.once=C.partial(C.before,2);var _=!{toString:null}.propertyIsEnumerable("toString"),N=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];C.keys=function(e){if(!C.isObject(e))return[];if(g)return g(e);var t=[];for(var n in e)C.has(e,n)&&t.push(n);return _&&o(e,t),t},C.allKeys=function(e){if(!C.isObject(e))return[];var t=[];for(var n in e)t.push(n);return _&&o(e,t),t},C.values=function(e){for(var t=C.keys(e),n=t.length,r=Array(n),a=0;n>a;a++)r[a]=e[t[a]];return r},C.mapObject=function(e,t,n){t=w(t,n);for(var r,a=C.keys(e),o=a.length,i={},s=0;o>s;s++)r=a[s],i[r]=t(e[r],r,e);return i},C.pairs=function(e){for(var t=C.keys(e),n=t.length,r=Array(n),a=0;n>a;a++)r[a]=[t[a],e[t[a]]];return r},C.invert=function(e){for(var t={},n=C.keys(e),r=0,a=n.length;a>r;r++)t[e[n[r]]]=n[r];return t},C.functions=C.methods=function(e){var t=[];for(var n in e)C.isFunction(e[n])&&t.push(n);return t.sort()},C.extend=E(C.allKeys),C.extendOwn=C.assign=E(C.keys),
C.findKey=function(e,t,n){t=w(t,n);for(var r,a=C.keys(e),o=0,i=a.length;i>o;o++)if(r=a[o],t(e[r],r,e))return r},C.pick=function(e,t,n){var r,a,o={},i=e;if(null==i)return o;C.isFunction(t)?(a=C.allKeys(i),r=x(t,n)):(a=I(arguments,!1,!1,1),r=function(e,t,n){return t in n},i=Object(i));for(var s=0,l=a.length;l>s;s++){var c=a[s],u=i[c];r(u,c,i)&&(o[c]=u)}return o},C.omit=function(e,t,n){if(C.isFunction(t))t=C.negate(t);else{var r=C.map(I(arguments,!1,!1,1),String);t=function(e,t){return!C.contains(r,t)}}return C.pick(e,t,n)},C.defaults=E(C.allKeys,!0),C.create=function(e,t){var n=k(e);return t&&C.extendOwn(n,t),n},C.clone=function(e){return C.isObject(e)?C.isArray(e)?e.slice():C.extend({},e):e},C.tap=function(e,t){return t(e),e},C.isMatch=function(e,t){var n=C.keys(t),r=n.length;if(null==e)return!r;for(var a=Object(e),o=0;r>o;o++){var i=n[o];if(t[i]!==a[i]||!(i in a))return!1}return!0};var P=function(e,t,n,r){if(e===t)return 0!==e||1/e===1/t;if(null==e||null==t)return e===t;e instanceof C&&(e=e._wrapped),t instanceof C&&(t=t._wrapped);var a=f.call(e);if(a!==f.call(t))return!1;switch(a){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!==+e?+t!==+t:0===+e?1/+e===1/t:+e===+t;case"[object Date]":case"[object Boolean]":return+e===+t}var o="[object Array]"===a;if(!o){if("object"!=typeof e||"object"!=typeof t)return!1;var i=e.constructor,s=t.constructor;if(i!==s&&!(C.isFunction(i)&&i instanceof i&&C.isFunction(s)&&s instanceof s)&&"constructor"in e&&"constructor"in t)return!1}n=n||[],r=r||[];for(var l=n.length;l--;)if(n[l]===e)return r[l]===t;if(n.push(e),r.push(t),o){if(l=e.length,l!==t.length)return!1;for(;l--;)if(!P(e[l],t[l],n,r))return!1}else{var c,u=C.keys(e);if(l=u.length,C.keys(t).length!==l)return!1;for(;l--;)if(c=u[l],!C.has(t,c)||!P(e[c],t[c],n,r))return!1}return n.pop(),r.pop(),!0};C.isEqual=function(e,t){return P(e,t)},C.isEmpty=function(e){return null==e?!0:L(e)&&(C.isArray(e)||C.isString(e)||C.isArguments(e))?0===e.length:0===C.keys(e).length},C.isElement=function(e){return!(!e||1!==e.nodeType)},C.isArray=h||function(e){return"[object Array]"===f.call(e)},C.isObject=function(e){var t=typeof e;return"function"===t||"object"===t&&!!e},C.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(e){C["is"+e]=function(t){return f.call(t)==="[object "+e+"]"}}),C.isArguments(arguments)||(C.isArguments=function(e){return C.has(e,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(C.isFunction=function(e){return"function"==typeof e||!1}),C.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},C.isNaN=function(e){return C.isNumber(e)&&e!==+e},C.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"===f.call(e)},C.isNull=function(e){return null===e},C.isUndefined=function(e){return void 0===e},C.has=function(e,t){return null!=e&&m.call(e,t)},C.noConflict=function(){return i._=s,this},C.identity=function(e){return e},C.constant=function(e){return function(){return e}},C.noop=function(){},C.property=R,C.propertyOf=function(e){return null==e?function(){}:function(t){return e[t]}},C.matcher=C.matches=function(e){return e=C.extendOwn({},e),function(t){return C.isMatch(t,e)}},C.times=function(e,t,n){var r=Array(Math.max(0,e));t=x(t,n,1);for(var a=0;e>a;a++)r[a]=t(a);return r},C.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},C.now=Date.now||function(){return(new Date).getTime()};var F={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},O=C.invert(F),A=function(e){var t=function(t){return e[t]},n="(?:"+C.keys(e).join("|")+")",r=RegExp(n),a=RegExp(n,"g");return function(e){return e=null==e?"":""+e,r.test(e)?e.replace(a,t):e}};C.escape=A(F),C.unescape=A(O),C.result=function(e,t,n){var r=null==e?void 0:e[t];return void 0===r&&(r=n),C.isFunction(r)?r.call(e):r};var V=0;C.uniqueId=function(e){var t=++V+"";return e?e+t:t},C.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,U=function(e){return"\\"+z[e]};C.template=function(e,t,n){!t&&n&&(t=n),t=C.defaults({},t,C.templateSettings);var r=RegExp([(t.escape||q).source,(t.interpolate||q).source,(t.evaluate||q).source].join("|")+"|$","g"),a=0,o="__p+='";e.replace(r,function(t,n,r,i,s){return o+=e.slice(a,s).replace(D,U),a=s+t.length,n?o+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?o+="'+\n((__t=("+r+"))==null?'':__t)+\n'":i&&(o+="';\n"+i+"\n__p+='"),t}),o+="';\n",t.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{var i=new Function(t.variable||"obj","_",o)}catch(s){throw s.source=o,s}var l=function(e){return i.call(this,e,C)},c=t.variable||"obj";return l.source="function("+c+"){\n"+o+"}",l},C.chain=function(e){var t=C(e);return t._chain=!0,t};var B=function(e,t){return e._chain?C(t).chain():t};C.mixin=function(e){C.each(C.functions(e),function(t){var n=C[t]=e[t];C.prototype[t]=function(){var e=[this._wrapped];return p.apply(e,arguments),B(this,n.apply(C,e))}})},C.mixin(C),C.each(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=l[e];C.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!==e&&"splice"!==e||0!==n.length||delete n[0],B(this,n)}}),C.each(["concat","join","slice"],function(e){var t=l[e];C.prototype[e]=function(){return B(this,t.apply(this._wrapped,arguments))}}),C.prototype.value=function(){return this._wrapped},C.prototype.valueOf=C.prototype.toJSON=C.prototype.value,C.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return C})}).call(this)},{}]},{},[1]);