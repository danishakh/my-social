import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomIconButton from '../../utils/CustomIconButton';
import NewPost from '../NewPost';
import Notifications from '../Notifications';

// Redux
import { connect } from 'react-redux';

// MUI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    navIconButton: {
        color: '#f5f5f4',
        '&:hover': {
            color: 'rgb(254, 192, 56)'
        }
    },
}
class Navbar extends Component {
    render() {
        const { classes, authenticated } = this.props;

        return (
            <AppBar position="fixed">
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <NewPost />
                            <Link to="/">
                                <CustomIconButton toolTipTitle="Home" btnClassName={classes.navIconButton}>
                                    <HomeIcon />
                                </CustomIconButton>
                            </Link>
                                <Notifications />
                        </Fragment>
                    ) : (
                        <Fragment>
                            
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