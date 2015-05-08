var services = require('../lib/services.js');
var geoLit = require('../lib/geo_lit.js');

module.exports = React.createClass({
    getInitialState: function(){
        return({ placeValue: '', errorMessage: ''});
    },

    render: function(){
        var addPlaceButtonClasses = 'js-add-place button expand';

        return(
            <div>
                <div>{this.state.errorMessage}</div>
                <form>
                    <div className="row">
                        <div className="small-12 columns">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={this.state.placeValue}
                                onChange={this.updatePlaceValue} />
                            <a
                                href="javascript:void(0)"
                                onClick={this.addPlace}
                                className={addPlaceButtonClasses}>Add Place</a>
                        </div>
                    </div>
                </form>
            </div>
        );
    },

    updatePlaceValue: function(event){
        this.setState({placeValue: event.target.value});
    },
    addPlace: function(event){
        var self = this;
        event.preventDefault();
        geoLit.addPlace(this.state.placeValue, function(errorMessage){
            if( errorMessage ){
                self.setState({'errorMessage': errorMessage});
            }

        })
    }

});