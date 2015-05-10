var _ = require('underscore');
var services = require('../lib/services.js');
var geoLit = require('../lib/geo_lit.js');

module.exports = React.createClass({

    addComment: function(parentId, comment){

        var self = this;
        var url = self.props.endpoint + '/comment/' + self.props.placeId +
                    '/' + parentId;

        $.ajax({
            type: "POST",
            'url': url,
            data: {
                'comment': comment,
                'userId': this.props.userId
            },
            success: function(response){
                if( response.status !== 'success' ){
                    console.log(response);
                } else {
                    self.setState({hasLoaded: false});
                    self.loadComments(self.props.placeId);
                }
            },
            error: function(err){
                console.log(err);
            },
            dataType: 'JSON'
        });
    },

    cleanComments: function(comments){
        var self = this;
        _.each(comments, function(comment){
            comment.addComment = self.addComment;
            if( comment.children.length !== 0 ){
                self.cleanComments(comment.children);
            }
        })
    },

    componentWillReceiveProps: function(nextProps){
        if( nextProps.placeId !== this.props.placeId ){
            this.loadComments(nextProps.placeId);
            this.setState({hasLoaded: false});
        }
    },

    getInitialState: function(){
        return({ hasLoaded: false, comments: [] });
    },

    loadComments: function(placeId){
        var self = this;

        $.ajax({
            type: "GET",
            url: self.props.endpoint + '/comments-formatted/' + placeId,
            success: function(response){
                if( response.status !== 'success' ){
                    console.log(response);
                } else {
                    self.cleanComments(response.data);
                    self.setState(
                        {'comments': response.data, hasLoaded: true}
                    );
                }
            },
            error: function(err){
                console.log(err);
            },
            dataType: 'JSON'
        });
    },
    render: function(){

        var addPlaceButtonClasses = 'js-add-place button expand';

        if(this.props.activeComponent !== 'comments' || !this.state.hasLoaded){
            return(<div>comments inactive</div>);
        } else {
            return(
                <div>
                    <h2>{this.props.placeTitle}</h2>
                    <Comments
                        comments={[{
                            parent: 0,
                            children: [],
                            comment: '',
                            addComment: this.addComment
                        }]} />
                    <h2>TEST</h2>
                    <Comments comments={this.state.comments} />
                </div>);
        }
    },
    updatePlaceValue: function(event){
        this.setState({placeValue: event.target.value});
    }
});

var Comments = React.createClass({
    render: function(){
        var self = this;

        var comments = this.props.comments.map(function(comment, index){
            var isOpen = false;
            if( comment.comment === null ){ isOpen = true; }
            var commentChildren = '';

            if( comment.children.length !== 0 ){
                commentChildren = <Comments comments={comment.children} />;
            }

            return(
                < Comment 
                    parent={comment.id}
                    childrenElement={commentChildren}
                    children={comment.children}
                    comment={comment.comment}
                    addComment={comment.addComment}
                    key={index} />
            );
        });

        return(
            <div>
                {comments}
            </div>
        );
    },
    updateComment: function(event){
        this.setState({comment: event.target.value});
    }
})

var Comment = React.createClass({

    getInitialState: function(){
        return({comment: ''});
    },
    handleSubmit: function(){
        event.preventDefault();
        this.props.addComment(this.props.parent, this.state.comment);
        console.log(this.state.comment);
    },
    render: function(){

        var self = this;

        return(
            <div className="sql-comment-container">
                <p>
                    {this.props.comment}
                </p>
                <p>
                    {this.props.parent}
                </p>
                <textarea
                    placeholder="Add Comment"
                    onChange={self.updateComment}
                    value={self.state.comment} />
                <button
                    href="javascript:null;"
                    className={"button small"}
                    onClick={self.handleSubmit}
                > Submit</button>
                <div>
                    {this.props.childrenElement}
                </div>
            </div>
        )
    },
    updateComment: function(event){
        this.setState({comment: event.target.value});
    }
})