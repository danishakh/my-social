import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import CustomIconButton from '../../utils/CustomIconButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
// import EditIcon from '@material-ui/icons/Edit';
// import DoneIcon from '@material-ui/icons/Done';
// import CancelIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CommentIcon from '@material-ui/icons/Comment';


// Redux
import { connect } from 'react-redux';
import { getPost } from '../../redux/actions/dataActions';
import theme from '../../utils/theme';

const styles = theme => ({
    ...theme.styling,
    commentIconButton: {
        color: '#fff',
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
        padding: 10
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30
    }
})

class PostDialog extends Component {
    constructor() {
        super();

        this.state = {
            open: false
        }
    }

    dialogOpenHandler = () => {
        this.setState({ open: true });
        this.props.getPost(this.props.postId);
    }

    dialogCloseHandler = () => {
        this.setState({ open: false })
    }

    render() {
        const { 
            classes, 
            post: { postId, body, createdAt, likeCount, commentCount, userImage, username },
            ui: { loading }
        } = this.props;

        const dialogPost = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={150} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={2}>
                <Grid item lg={5} md={5} sm={5}>
                    <img src={userImage} alt='Profile Image' className={classes.profileImage} />
                </Grid>
                <Grid item lg={7} md={7} sm={7}>
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

                </Grid>
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
                    maxWidth='xs'
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
    getPost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));