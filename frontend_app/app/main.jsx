/*******************************************************************************

                    SETUP

*******************************************************************************/

var MAP_ID = 'map-canvas'

var geoLit = require('./lib/geo_lit')

console.log(MAP_ID)

geoLit.init(MAP_ID, function(err){
    if( err ){ console.log(err) }
    else{
        console.log('map initialzed')
    }
})

/*******************************************************************************

                    REACT

*******************************************************************************/

var AddPlaceForm = require('./components/addPlaceForm.jsx');
var Comments = require('./components/comments.jsx');

var Main = React.createClass({

    componentDidMount: function(){

        var self = this;

        $(document).on('geo-lit-place-click', function(event, args){
            self.setState({
                activeComponent: 'comments',
                placeId: args._id
            })
        });
    },

    getInitialState: function(){
        return {
            activeComponent: 'addPlaceForm',
            placeId: null
        };
    },

    render: function(){
        return(
            <div>
                <AddPlaceForm
                    activeComponent={this.state.activeComponent} />
                <Comments
                    activeComponent={this.state.activeComponent}
                    placeId={this.state.placeId} />
            </div>
        );
    }
});

React.render(<Main />, document.getElementById('content'));