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

    // called on success when new place is added
    addPlaceCallback: function(place){
        var self = this;
        self.setState({
            activeComponent: 'comments',
            placeId: place._id,
            placeTitle: place.title
        });
    },

    componentDidMount: function(){
        var self = this;
        $(document).on('geo-lit-place-click', function(event, args){
// console.log(args)
            self.setState({
                activeComponent: 'comments',
                placeId: args._id,
                placeTitle: args.title,
            })
        });


this.setState({
    activeComponent: 'comments',
    placeId: '5556b2cab32d7ae70ec8a914',
    placeTitle: 'TEST TITLE',
});
// asdf
// {_id: "5556b2cab32d7ae70ec8a914", title: "TEST TITLE"}

    },

    getInitialState: function(){
        return {
            activeComponent: 'addPlaceForm',
            placeId: null,
            userId: null,
            user: null,
            isLoggedIn: false
        };
    },

    loginCallback: function(user){
        this.setState({
            user: user,
            userId: user.id,
            isLoggedIn: true
        })
    },

    logoutCallback: function(){
        this.setState({
            user: null,
            userId: null,
            isLoggedIn: false
        })
    },

    render: function(){
        var self = this;

        var addPlaceElement = null;
        if( self.state.isLoggedIn ){
            addPlaceElement = <AddPlaceForm
                                activeComponent={self.state.activeComponent}
                                addPlaceCallback={self.addPlaceCallback} />;
        }

        return(
            <div>
                <UserForm
                    endpoint={config.userEndpoint}
                    loginCallback={this.loginCallback}
                    logoutCallback={this.logoutCallback} />
                { addPlaceElement }

<div className="row">
    <div className="small-12 columns">


                <Comments
                    activeComponent={this.state.activeComponent}
                    endpoint={config.commentEndpoint}
                    placeId={this.state.placeId}
                    placeTitle={this.state.placeTitle}
                    userId={this.state.userId} />


    </div>
</div>
            </div>
        );
    }
});

React.render(<Main />, document.getElementById('content'));