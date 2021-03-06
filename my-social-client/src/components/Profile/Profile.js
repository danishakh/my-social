import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import EditProfile from '../EditProfile';
import CustomIconButton from '../../utils/CustomIconButton';
import ProfileSkeleton from '../../utils/ProfileSkeleton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';


const styles = theme => ({
    paper: {
        padding: 15,
        border: '1px solid #71A0D4',
        backgroundColor: 'rgb(33,32,44)'
    },
    iconButton: {
        color: '#fff',
        '&:hover': {
            color: 'rgb(254, 192, 56)'
        }
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
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer',
            }
        }
    },
    buttons: {
        textAlign: 'center'
    },
    welcomeMsg: {
        color: 'rgb(254,192,56)',
        fontFamily: 'Long Cang, cursive'
    },
    profileDetails: {
        [theme.breakpoints.down('sm')]: {
            fontSize:9
        }
    }
});

class Profile extends Component {
    
    updateImageHandler = (e) => {
        // when the user selects the file, e.target puts it in an array 'files'
        const image = e.target.files[0];
        // send this to server
        const formData = new FormData();
        // append the image to formData
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    handleEditImage = () => {
        // just click the input (we are doing this since we have hidden the actual input and covered it with a custom icon button)
        const fileInput = document.getElementById('profile-image-input');
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    }

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
                        <img src={imageUrl} className='profile-image' alt="Profile" />
                        <input 
                            type="file" 
                            id="profile-image-input" 
                            onChange={this.updateImageHandler} 
                            hidden="hidden"
                        />
                        <CustomIconButton 
                            placement="bottom-start" 
                            toolTipTitle="Edit Image"
                            onClick={this.handleEditImage}
                            btnClassName={classes.iconButton}
                        >
                            <EditIcon  />
                        </CustomIconButton>
                    </div>
                    <hr/>
                    <div className='profile-name-bio'>
                        <MuiLink component={Link} to={`/users/${username}`} color='secondary' variant='h5'>
                            @{username}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="caption" className={classes.bio}>{bio}</Typography>}
                        <hr/>
                    </div>
                    <div className='profile-details'>
                        {location && (
                            <Fragment>
                                <LocationIcon color='primary'/> <Typography variant='overline' className={classes.profileDetails}>{location}</Typography>
                                <hr/>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color='primary'/>
                                <a href={website} target='_blank' rel="noopener noreferrer">
                                <Typography variant='overline' className={classes.profileDetails}>{' '}{website}</Typography></a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarIcon color='primary' />{' '}
                        <Typography variant="overline" className={classes.profileDetails}>Joined {dayjs(createdAt).format('MMM YYYY')}</Typography>
                    </div>

                    {/* Logout Button */}
                    <CustomIconButton 
                            placement="bottom" 
                            toolTipTitle="Logout"
                            onClick={this.handleLogout}
                            btnClassName={classes.iconButton}
                        >
                            <KeyboardReturn  />
                        </CustomIconButton>
                    {/* Edit Profile Button */}
                    <EditProfile />
                </div>
            </Paper>) : (   // if not authenticated
                <Paper className={classes.paper}>
                    <Typography variant='h5' align='center' className={classes.welcomeMsg}>
                        Welcome to Buzzer!
                    </Typography>
                    <div className={classes.buttons}>
                        <Button style={{marginBottom: 10, marginTop: 10}} fullWidth variant='outlined' color='secondary' component={Link} to='/login'>
                            Login
                        </Button>
                        <Button fullWidth  variant='outlined' color='secondary' component={Link} to='/register'>
                            Register
                        </Button>
                    </div>
                </Paper>
            )) : <ProfileSkeleton />


        // we will return profileComponent based on whether we are loading and authenticated
        return profileComponent
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    logoutUser, uploadImage
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
