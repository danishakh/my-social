import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CustomIconButton from '../../utils/CustomIconButton';
import DeletePostButton from '../DeletePostButton';
import PostDialog from '../PostDialog';
import LikeButton from '../LikeButton';

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
    }
}

class Post extends Component {

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
                        
                        <LikeButton postId={postId} />

                        <span>{likeCount}</span>

                        <PostDialog postId={postId} username={username} />
                        <span>{commentCount}</span>

                        
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});


export default connect(mapStateToProps)(withStyles(styles)(Post));
