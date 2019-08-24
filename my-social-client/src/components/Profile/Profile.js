import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarIcon from '@material-ui/icons/CalendarToday';


const styles = theme => ({
    paper: {
        padding: 15
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative'
        },
        '& .profile-image': {
            // width: 200,
            // height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '50%'
        },
        '& .profile-name-bio': {
            textAlign: 'center'
        },
        '& .profile-details': {
            marginTop: 15,
            textAlign: 'left',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 2% 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '5% 5%'
        }
    }
});

class Profile extends Component {
    render() {
        const { 
            classes, 
            user: { 
                credentials: { username, createdAt, imageUrl, bio, website, location }, 
                loading,     // loading prop to show skeleton - we will use this when userProfile is loading
                authenticated
            }
        } = this.props;

        // If we are not loading -> check if we are authenticated -> display appropriately
        // Else show loading
        let profileComponent = !loading ? (authenticated ? 
            (<Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={imageUrl} className='profile-image' alt="Profile Image" />
                    </div>
                    <hr/>
                    <div className='profile-name-bio'>
                        <MuiLink component={Link} to={`/users/${username}`} color='primary' variant='h5'>
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
            </Paper>) : (   // if not authenticated
                <Paper className={classes.paper}>
                    <Typography variant='body2' align='center'>
                    No Profile Found! Please Login</Typography>
                    <div className={classes.buttons}>
                        <Button variant='contained' color='primary' component={Link} to='/login'>
                            Login
                        </Button>
                        <Button variant='contained' color='primary' component={Link} to='/register'>
                            Register
                        </Button>
                    </div>
                </Paper>
            )) : (<p>Loading...</p>)


        // we will return profileComponent based on whether we are loading and/or authenticated
        return profileComponent
    }
}

const mapStateToProps = state => ({
    user: state.user
});

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));
