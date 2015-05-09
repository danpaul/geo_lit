var services = require('../lib/services.js');
var geoLit = require('../lib/geo_lit.js');

module.exports = React.createClass({

    componentWillReceiveProps: function(nextProps){
        if( nextProps.placeId !== this.props.placeId ){
            this.loadComments(nextProps.placeId);
            this.setState({hasLoaded: false});
        }
    },

    getInitialState: function(){
        return({ isVisible: false, hasLoaded: false });
    },

    loadComments: function(placeId){
        console.log(placeId)
    },

    render: function(){

        var addPlaceButtonClasses = 'js-add-place button expand';

        if( this.props.activeComponent !== 'comments' ){
            return(<div>comments active</div>);
        } else {
            return(<div>comments inactive</div>);
        }
    },

    updatePlaceValue: function(event){
        this.setState({placeValue: event.target.value});
    }

});