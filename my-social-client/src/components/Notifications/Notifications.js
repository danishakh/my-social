import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import CommentIcon from '@material-ui/icons/Comment'

// Redux
import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
    constructor() {
        super();

        this.state = {
            anchorElement: null
        }
    }

    notifOpenHandler = e => {
        this.setState({
            anchorElement: e.target
        });
    }

    notifCloseHandler = e => {
        this.setState({
            anchorElement: null
        });
    }

    onMenuOpened = () => {
        // Filter out the unread notifs
        // Map through them and get their id and pass it to our action
        let unreadNotifIds = this.props.notifications
            .filter(notif => !notif.read)
            .map(notif => notif.notificationId);

        this.props.markNotificationsRead(unreadNotifIds);
    }

    render() {
        const notifications = this.props.notifications;
        const anchorElement = this.state.anchorElement

        dayjs.extend(relativeTime);

        // Display a different icon for likes/comments
        let notifIcon;
        if (notifications && notifications.length > 0) {
            // Filter out the unread notifs, if it is greater than 0 then display badge
            notifications.filter(notif => notif.read === false).length > 0
                ? (
                    notifIcon = (
                        <Badge 
                            badgeContent={notifications.filter(notif => notif.read === false).length}
                            color='secondary'
                        >
                            <NotificationIcon />
                        </Badge>
                    )
                ) : (
                    // Else just display the icon
                    notifIcon = <NotificationIcon />
                )
        }
        else {
            notifIcon = <NotificationIcon />
        }

        let notificationsMenu = 
            (notifications && notifications.length > 0) ? (
                notifications.map(notif => {
                    const notifType = notif.type === 'like' ? 'liked' : 'commented on';
                    const notifTime = dayjs(notif.createdAt).fromNow();
                    const textColor = notif.read ? '#f5f5f4' : 'rgba(254, 192, 56)';
                    const icon = notif.type === 'like' ? (
                        <FavoriteIcon style={{ marginRight: 5, color: '#cd4c78' }} />
                    ) : (
                        <CommentIcon style={{ marginRight: 5, color: 'rgba(254, 192, 56)' }} />
                    )

                    return (
                        <MenuItem key={notif.createdAt} onClick={this.notifCloseHandler} style={{backgroundColor: 'rgb(33, 32,44)'}}>
                            {icon}
                            <Typography
                                component={Link}
                                style={{ color: textColor}}
                                variant='caption'
                                to={`/users/${notif.recipient}/post/${notif.postId}`}
                            >
                                {notif.sender} {notifType} your buzz {notifTime}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.notifCloseHandler} style={{backgroundColor: 'rgb(33, 32,44)'}}>
                    No New Notifications!
                </MenuItem>
            )

        return(
            <Fragment>
                <Tooltip placement='top' title='Notifications'>
                    <IconButton 
                        aria-owns={anchorElement ? 'simple-menu' : undefined}
                        aria-controls="menu-list-grow"
                        aria-haspopup='true'
                        onClick={this.notifOpenHandler}
                    >
                        {notifIcon}
                    </IconButton>
                </Tooltip>
                <Menu  
                    anchorEl={anchorElement}
                    open={Boolean(anchorElement)}
                    onClose={this.notifCloseHandler}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMenu}
                </Menu>
            </Fragment>
        )
    }

}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
});

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);