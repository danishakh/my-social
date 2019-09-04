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
    paper: {
        padding: 15,
        border: '1px solid #71A0D4',
        backgroundColor: 'rgb(33,32,44)'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '75%'
            }
        },
        '& .profile-image': {
            objectFit: 'cover',
            maxWidth: '80%',
            maxHeight: '80%',
            borderRadius: '50%'
        },
        '& .profile-name-bio': {
            textAlign: 'center',
            color: '#fff'
        },
        '& .profile-details': {
            marginTop: 15,
            textAlign: 'left',
            color: '#fff',
            '& span, svg': {
                verticalAlign: 'middle',
                color: '#fff'
            },
            '& a': {
                color: '#fff',
                // '&:hover': {
                //     color: 'rgb(254, 192, 56)'
                // }
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 2% 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer',
            }
        }
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
                <hr/>
                <div className='profile-name-bio'></div>
                <div className='profile-details'>
                    <div className={classes.username}></div>
                    <hr/>
                    <div className={classes.fullLine}></div>
                    <div className={classes.fullLine}></div>
                </div>
                <hr/>
                <LocationIcon /> <span>Location</span>
                <hr/>
                <LinkIcon /><span>https://website.com</span>
                <hr/>
                <CalendarIcon /><span>Joined Date</span>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);
