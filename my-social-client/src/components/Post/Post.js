import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CustomIconButton from '../../utils/CustomIconButton';
import DeletePostButton from '../DeletePostButton';
import PostDialog from '../PostDialog';


// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography  from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


// Redux 
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 10,
        backgroundColor: 'rgb(33,32,44)',
        border: '1px solid #71A0D4',
        color: '#fff',
        '& .createdAtCaption': {
            color: 'grey',
            marginTop: 1
        }
    },
    image: {
        width: 80,
        height: 80,
        margin: 5
    },
    content: {
        padding: 10,
        '&:last-child': {
            paddingBottom: 0
        }
    },
    iconButton: {
        color: '#fff',
        '&:hover': {
            color: 'rgb(254, 192, 56)'
        }
    },
    likedIconButton: {
        color: '#CD4C78'
    },
    unlikedIconButton: {
        color: '#fff'
    }
}

class Post extends Component {

    postIsLiked = () => {
        // Check if we have a likes array in our user object (to see if a user is even logged in)
        if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.post.postId)) {
            return true;
        }
        else return false;
    };

    likePost = () => {
        this.props.likePost(this.props.post.postId);
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.post.postId);
    }

    render() {

        dayjs.extend(relativeTime);
        const { 
            classes, 
            post : { body, createdAt, userImage, username, postId, likeCount, commentCount },
            user: {
                authenticated,
                credentials
            }
        
        } = this.props;
        
        // Like Button Logic
        const likeButton = !authenticated ? (
            <CustomIconButton toolTipTitle="Like" btnClassName={classes.unlikedIconButton}>
                <Link to="/login">
                    <FavoriteBorder />
                </Link>
            </CustomIconButton>
        ) : (
            this.postIsLiked() ? (
                <CustomIconButton toolTipTitle="Unlike" onClick={this.unlikePost} btnClassName={classes.likedIconButton}>
                    <FavoriteIcon />
                </CustomIconButton>
            ) :
            (
                <CustomIconButton toolTipTitle="Like" onClick={this.likePost} btnClassName={classes.unlikedIconButton}>
                    <FavoriteBorder />
                </CustomIconButton>
            )
        );

        // Delete Button Logic
        const deleteButton = authenticated && username === credentials.username ? (
            <DeletePostButton postId={postId} />
        ) : null

        return (
            <div>
                <Card className={classes.card}>
                    <Avatar src={userImage} alt={username} className={classes.image} />
                    <CardContent className={classes.content}>
                        <Typography 
                            variant="h6" 
                            component={Link} 
                            to={`/users/${username}`} 
                            color="secondary">
                            @{username}
                        </Typography> <br/>
                        
                        {deleteButton}

                        <Typography variant="caption" className='createdAtCaption'>{dayjs(createdAt).fromNow()}</Typography><br/>
                        <Typography variant="body1">{body}</Typography>
                        
                        {likeButton}
                        <span>{likeCount}</span>

                        {/* <CustomIconButton toolTipTitle="Comment" placement='bottom' btnClassName={classes.iconButton}>
                            <CommentIcon />
                        </CustomIconButton> */}
                        <PostDialog postId={postId} username={username} />
                        <span>{commentCount}</span>

                        
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likePost, 
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
