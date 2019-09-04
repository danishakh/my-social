import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import CustomIconButton from '../../utils/CustomIconButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import Comments from '../Comments';
import CommentForm from '../CommentForm';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close';
import CommentIcon from '@material-ui/icons/Comment';


// Redux
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';


const styles = {
    commentIconButton: {
        color: '#f5f5f4',
        '&:hover': {
            color: 'rgb(254, 192, 56)'
        }
    },
    hrStyle: {
        border: 'none',
        margin: 5
    },
    profileImage: {
        maxWidth: 160,
        maxHeight: 160,
        borderRadius: '50%',
        objectFit: 'contain'
    },
    dialogContent: {
        padding: 15,
        background: '#21202C',
        color: '#F5F5F4'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        color: '#f5f5f4'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30
    }
}

class PostDialog extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            oldURLPath: '',
            newURLPath: ''
        }
    }

    // Need to check if openDialog props is passed as true, and open the PostDialog (notifications)
    componentDidMount() {
        if (this.props.openDialog) {
            this.dialogOpenHandler();
        }
    }

    dialogOpenHandler = () => {
        // Twitter Like URL Displaying - whenever we open a specific postDialog, the URL would change to newPath
        // the path that we have currently
        let oldPath = window.location.pathname;
        const { username, postId } = this.props;
        // the path that we want to go to - to open the post via notifications
        const newPath = `/users/${username}/post/${postId}`
        window.history.pushState(null, null, newURLPath);

        this.setState({ open: true, oldURLPath, newURLPath });
        this.props.getPost(this.props.postId);
    }

    dialogCloseHandler = () => {
        // Reverse from the openHandler, we revert back to the old path once the postDialog is closed
        window.history.pushState(null, null, oldURLPath);

        this.setState({ open: false })
        this.props.clearErrors();
    }

    render() {
        const { 
            classes, 
            post: { postId, body, createdAt, likeCount, commentCount, userImage, username, comments },
            ui: { loading }
        } = this.props;

        const dialogPost = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={150} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={2}>
                <Grid item lg={4} md={4} sm={4}>
                    <img src={userImage} alt='Profile Image' className={classes.profileImage} />
                </Grid>
                <Grid item lg={8} md={8} sm={8}>
                    <Typography
                        component={Link}
                        color='secondary'
                        variant='h5'
                        to={`/users/${username}`}
                    >
                    @{username}
                    </Typography>
                    <hr className={classes.hrStyle} />
                    <Typography 
                        variant="caption" 
                        className='createdAtCaption'>{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    
                    <hr className={classes.hrStyle} />

                    <Typography variant="body1">{body}</Typography>
                    <LikeButton postId={postId} />
                    <span>{ likeCount } Likes</span>

                    <CustomIconButton toolTipTitle='Comments' btnClassName={classes.commentIconButton}>
                        <CommentIcon /> 
                    </CustomIconButton>
                    <span> { commentCount } Comments</span>
                </Grid>
                {/* Post Comments Section */}
                <CommentForm postId={postId} />
                <Comments comments={comments} />
            </Grid>
        )

        return(
            <Fragment>
                <CustomIconButton onClick={this.dialogOpenHandler} toolTipTitle='Comments' btnClassName={classes.commentIconButton}>
                    <CommentIcon />
                </CustomIconButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.dialogCloseHandler}
                    fullWidth
                    maxWidth='sm'
                >
                    <CustomIconButton 
                        toolTipTitle='Close' 
                        onClick={this.dialogCloseHandler} 
                        toolTipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </CustomIconButton>
                    <DialogContent className={classes.dialogContent}>
                        { dialogPost }
                    </DialogContent>
                </Dialog>

            </Fragment>
        )
    }
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.data.post,
    ui: state.ui
});

const mapActionsToProps = {
    getPost,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));