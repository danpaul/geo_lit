/*******************************************************************************

                    SETUP

*******************************************************************************/

var MAP_ID = 'map-canvas'

var geoLit = require('./lib/geo_lit');
var config = require('../config');

geoLit.init(MAP_ID, function(err){
    if( err ){ console.log(err); }
    else{
        console.log('map initialzed');
    }
})

/*******************************************************************************

                    REACT

*******************************************************************************/

var AddPlaceForm = require('./components/addPlaceForm.jsx');
var Comments = require('./components/comments.jsx');
var UserForm = require('./lib/user/index.jsx');

var Main = React.createClass({

    componentDidMount: function(){

        var self = this;

        $(document).on('geo-lit-place-click', function(event, args){
            self.setState({
                activeComponent: 'comments',
                placeId: args._id,
                placeTitle: args.title,
            })
        });
    },

    getInitialState: function(){
        return {
            activeComponent: 'addPlaceForm',
            placeId: null,
// TODO: UPDATE THIS!!!
            userId: 1,
            user: null,
            isLoggedIn: false
        };
    },

    loginCallback: function(user){
console.log(user);
        this.setState({
            user: user,
            isLoggedIn: true
        })
    },

    logoutCallback: function(){
        this.setState({
            user: null,
            isLoggedIn: false
        })
    },

    render: function(){
        return(
            <div>
                <UserForm
                    endpoint={config.userEndpoint}
                    loginCallback={this.loginCallback}
                    logoutCallback={this.logoutCallback} />
                <AddPlaceForm
                    activeComponent={this.state.activeComponent} />
                <Comments
                    activeComponent={this.state.activeComponent}
                    endpoint={config.commentEndpoint}
                    placeId={this.state.placeId}
                    placeTitle={this.state.placeTitle}
                    userId={this.state.userId} />
            </div>
        );
    }
});

React.render(<Main />, document.getElementById('content'));