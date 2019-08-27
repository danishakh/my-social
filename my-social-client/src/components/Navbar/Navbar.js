import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomIconButton from '../../utils/CustomIconButton';

// Redux
import { connect } from 'react-redux';

// MUI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home'
import NotificationIcon from '@material-ui/icons/Notifications'


class Navbar extends Component {
    render() {
        const { authenticated } = this.props;

        return (
            <AppBar position="fixed">
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <CustomIconButton toolTipTitle="New Buzz">
                                <AddIcon />
                            </CustomIconButton>
                            <Link to="/">
                                <CustomIconButton toolTipTitle="Home">
                                    <HomeIcon />
                                </CustomIconButton>
                            </Link>
                            <CustomIconButton toolTipTitle="Notifications">
                                <NotificationIcon />
                            </CustomIconButton>
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
    authenticated: PropTypes.bool.isRequired
} 

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);