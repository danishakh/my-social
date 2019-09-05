import React, { Component } from 'react'
import CustomIconButton from '../../utils/CustomIconButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import withStyles from '@material-ui/core/styles/withStyles'

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

const styles = {
    likedIconButton: {
        color: '#CD4C78'
    },
    unlikedIconButton: {
        color: '#f5f5f4'
    }
}

export class LikeButton extends Component {

    postIsLiked = () => {
        // Check if we have a likes array in our user object (to see if a user is even logged in)
        if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId)) {
            return true;
        }
        else return false;
    };

    likePost = () => {
        this.props.likePost(this.props.postId);
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.postId);
    }

    render() {

        const { classes, user: { authenticated } } = this.props;

        // Like Button Logic
        const likeButton = !authenticated ? (
            <Link to="/login">
                <CustomIconButton toolTipTitle="Like" btnClassName={classes.unlikedIconButton}>
                    <FavoriteBorder />
                </CustomIconButton>
            </Link>
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
        return likeButton
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapActionsToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton));
