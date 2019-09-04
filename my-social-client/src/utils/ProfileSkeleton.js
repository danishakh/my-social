import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import NoImg from '../images/no-img.png';

// MUI
import Paper from '@material-ui/core/Paper'
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link'
import CalendarIcon from '@material-ui/icons/CalendarToday'

const styles = theme => ({
    ...theme.styling,
    paper: {
        padding: 15,
        border: '1px solid #71A0D4',
        backgroundColor: 'rgb(33,32,44)'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center'
        },
        '& .profile-image': {
            width: 180,
            height: 180,
            borderRadius: '50%'
        }
    },
    username: {
        height: 30,
        backgroundColor: 'rgba(254,192,56)',
        width: 80,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height: 15,
        backgroundColor: '#c0c0c0',
        width: '100%',
        marginBottom: 15
    },
    details: {
        color: '#f5f5f4',
        marginBottom: 10,
        fontSize: 12
    },
    icons: {
        marginRight: 5
    }
})

const ProfileSkeleton = props => {
    const { classes } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={NoImg} alt='noImg' className='profile-image'/>
                </div>
                <hr className={classes.invisibleSeparator}/>
                <div className='profile-details'>
                    <div className={classes.username}></div>
                    <hr className={classes.invisibleSeparator}/>
                    <div className={classes.fullLine}></div>
                    <div className={classes.fullLine}></div>
                </div>
                <hr className={classes.invisibleSeparator}/>
                <div className={classes.details}>
                    <LocationIcon className={classes.icons}/>
                    <hr className={classes.invisibleSeparator}/>
                </div>
                <div className={classes.details}>
                    <LinkIcon className={classes.icons} />
                    <hr className={classes.invisibleSeparator}/>
                </div>
                <div className={classes.details}>
                    <CalendarIcon className={classes.icons} />
                    <hr className={classes.invisibleSeparator}/>
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);
