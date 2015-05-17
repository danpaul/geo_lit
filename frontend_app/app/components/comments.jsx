var _ = require('underscore');

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
            return(null);
        } else {
            return(
                <div>
                    < Comment 
                        children={[]}
                        isTopLevel={true}
                        addComment={this.addComment} />
                    <Comments
                        comments={[{
                            parent: 0,
                            children: [],
                            comment: '',
                            addComment: this.addComment
                        }]} />
                    <h2> </h2>
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
                    created={comment.created}
                    rank={comment.rank}
                    key={index}
                    isTopLevel={false} />
            );
        });

        return(<div>{comments}</div>);
    },
    updateComment: function(event){
        this.setState({comment: event.target.value});
    }
})

var Comment = React.createClass({

    getInitialState: function(){
        return({
            comment: '',
            showCommentForm: false,
            showControls: false,
            showChildren: true});
    },
    handleCancel: function(){
        this.setState({showCommentForm: false});
    },
    handleShowControl: function(){
        this.setState({showControls: !this.state.showControls});
    },
    handleSubmit: function(){
        event.preventDefault();
        this.props.addComment(this.props.parent, this.state.comment);
    },
    handleToggleChilren: function(){
        var nextState = !this.state.showChildren;
        this.setState({
            showChildren: nextState, showControls: false});
    },
    handleToggleCommentForm: function(){
        var nextState = !this.state.showCommentForm;
        this.setState({showCommentForm: nextState});
    },
    render: function(){

        var self = this;

        var commentFormStyle = this.state.showCommentForm &&
                               this.state.showControls ?
                                    {display: 'block', marginTop: '10px'} :
                                    {display: 'none'};

        if( self.props.isTopLevel ){
            commentFormStyle = {display: 'block', marginTop: '10px'};
        }

        var toggleCharacter = self.state.showChildren ? '-' : '+';
        var childContainerStyle = self.state.showChildren ?
                {display: 'block'} : {display: 'none'};
        var toggleButtonStle = (self.props.children.length === 0) ?
                                    {display: 'none'} : {display: 'block'};
        var commentRank = self.props.rank ? self.props.rank : 0;

        var createdDate = new Date(self.props.created * 1000).toString();
        var hasChildren = this.props.children.length > 0;

        return(
            <div
                className="sql-comment-container"
                style={{marginTop: '10px'}} >

                <div
                    className="sql-comment-comment-meta"
                    style={ self.props.isTopLevel ?
                        {display: 'none'} : {marginTop: '10px'}}
                >
                    <span className="sql-comment-username">
                        danpaul
                    </span> - 
                    <span className="sql-comment-date">
                        &nbsp;{createdDate}
                    </span> - 
                    <span style={{
                        marginLeft: '3px',
                        position: 'relative',
                        top: '1px'

                    }}>
                        {commentRank}
                    </span>
                </div>
                <div
                    style={{cursor: 'pointer'}}
                    onClick={self.handleShowControl}
                >
                    {this.props.comment}
                </div>
                <div style={ this.state.showControls ?
                                {display: 'block'} : {display: 'none'}} >

                </div>
                <div style={ this.state.showControls ?
                                {display: 'block'} : {display: 'none'}}>

                    <a onClick={this.handleUpvote}>
                        upvote
                    </a>&nbsp;-&nbsp;
                    <a onClick={this.handleDownvote}>
                        downvote
                    </a>&nbsp;-&nbsp;
                    <a onClick={this.handleToggleCommentForm}>
                        comment
                    </a>
                    <span style={ hasChildren ?
                        {display: 'inline'} : {display: 'none'}}>

                        &nbsp;-&nbsp;
                        <a onClick={this.handleToggleChilren}>
                            { this.state.showChildren ? 'collapse' : 'reveal' }
                        </a>
                    </span>
                </div>

                <div style={commentFormStyle}>
                    <textarea
                        placeholder="Add Comment"
                        onChange={self.updateComment}
                        value={self.state.comment} />
                    <button
                        href="javascript:null;"
                        className={"button small"}
                        onClick={self.handleSubmit}
                    >Submit</button>
                    <button
                        href="javascript:null;"
                        className={"button small inverted left-padded"}
                        onClick={self.handleCancel}
                    >Cancel</button>
                </div>

                <div style={childContainerStyle}>
                    {this.props.childrenElement}
                </div>
            </div>
        )
    },
    updateComment: function(event){
        this.setState({comment: event.target.value});
    }
});

var FadeAlert = React.createClass({
    alertStyle: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(255, 0, 0, 0.2',
        display: 'block',
        color: '#FFFFFF'
    },

    fadeOutTime: 2000,

    triggerFadeOut: function(){

        $('#sql-comment-alert-box').fadeOut(this.fadeOutTime);
    },

    render: function(){
        if( this.props.message === '' ){
            return null;
        }
        this.triggerFadeOut();
        return(
            <div id="sql-comment-alert-box" style={this.alertStyle}>
            asdfasdfasdfasdf
                {this.props.message}
            </div>
        );
    }
});