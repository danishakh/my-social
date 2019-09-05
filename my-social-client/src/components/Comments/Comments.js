import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    ...theme.styling,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: '10%'
    },
    commentData: {
        marginLeft: 2
    }
});

export class Comments extends Component {
    render() {
        const { comments, classes } = this.props;

        return (
            <Grid container spacing={2}>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, username } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container style={{marginBottom: 10}}>
                                    <Grid item sm={3}>
                                        <img src={userImage} alt='comment' className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant='h5'
                                                component={Link}
                                                to={`/users/${username}`}
                                                color='secondary'
                                            >
                                            @{username}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />

                                            <Typography variant='caption'>
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />

                                            <Typography variant='body2'>
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                {index !== comments.length - 1 && (<hr className={classes.visibleSeparator} />)}
                            </Grid>
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);
