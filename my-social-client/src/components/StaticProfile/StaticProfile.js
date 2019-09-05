import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'

// MUI
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarIcon from '@material-ui/icons/CalendarToday';

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
            maxWidth: '100%',
            maxHeight: '100%',
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
        }
    }
});

const StaticProfile = props => {
    const { classes, profile: { username, createdAt, imageUrl, bio, website, location} } = props;

    return(
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={imageUrl} className='profile-image' alt="Profile" />
                </div>
                <hr/>
                <div className='profile-name-bio'>
                    <MuiLink component={Link} to={`/users/${username}`} color='secondary' variant='h5'>
                        @{username}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="caption">{bio}</Typography>}
                    <hr/>
                </div>
                <div className='profile-details'>
                    {location && (
                        <Fragment>
                            <LocationIcon color='primary'/> <Typography variant='overline'>{location}</Typography>
                            <hr/>
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color='primary'/>
                            <a href={website} target='_blank' rel="noopener noreferrer">
                            <Typography variant='overline'>{' '}{website}</Typography></a>
                            <hr/>
                        </Fragment>
                    )}
                    <CalendarIcon color='primary' />{' '}
                    <Typography variant="overline">Joined {dayjs(createdAt).format('MMM YYYY')}</Typography>
                </div>
            </div>
        </Paper>
    )

}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);
