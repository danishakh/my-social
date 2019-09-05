import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomIconButton from '../../utils/CustomIconButton';
import NewPost from '../NewPost';
import Notifications from '../Notifications';
import buzzerLogo from '../../images/buzzer.png'

// Redux
import { connect } from 'react-redux';

// MUI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home'
import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link'

const styles = {
    navIconButton: {
        color: '#f5f5f4',
        '&:hover': {
            color: 'rgb(254, 192, 56)'
        }
    },
    logo: {
        width: '30%',
        height: '30%'
    },
    logoLinkWrapper: {
        maxWidth: 60,
        height: 60,
        justifyContent: 'center'
    },
    logoAuth: {
        width: '100%',
        height: '100%'
    }
}
class Navbar extends Component {
    render() {
        const { classes, authenticated } = this.props;

        return (
            <AppBar position="fixed">
                <Toolbar className="nav-container" style={{justifyContent: 'center', textAlign: 'center'}}>
                    {authenticated ? (
                        <Fragment>
                            <NewPost />
                            <Link to="/" className={classes.logoLinkWrapper}>
                                <img src={buzzerLogo} className={classes.logoAuth} alt="buzzer-logo" />
                            </Link>
                            <Notifications />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Link to="/">
                                <img src={buzzerLogo} className={classes.logo} alt="buzzer-logo"  />
                            </Link>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));