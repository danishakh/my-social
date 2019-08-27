import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { editUserData } from '../../redux/actions/userActions';

// MUI
import Tooltip  from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
    ...theme.styling,
    dialogTextField: {
        margin: '10px auto 10px auto',
        background: 'rgb(254, 192, 56)'
    },
    editProfileDialog: {
        background: 'rgb(254, 192, 56)'
    },
    iconButton: {
        color: '#fff',
        float: 'right',
        '&:hover': {
            color: 'rgb(254, 192, 56)'
        }
    }
});


class EditProfile extends Component {
    constructor() {
        super();

        this.state = {
            bio: '',
            website: '',
            location: '',
            open: false        
        }
    }

    handleDialogOpen = () => {
        this.setState({ open: true });
        this.mapUserDataToState(this.props.credentials);
    }

    handleDialogClose = () => {
        this.setState({ open: false });
    }

    mapUserDataToState = credentials => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmitHandler = () => {
        const userData = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };

        this.props.editUserData(userData);
        this.handleDialogClose();
        this.setState({
            notifOpen: true
        });
    }

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDataToState(credentials);
    }


    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit Profile" placement="bottom">
                    <IconButton onClick={this.handleDialogOpen} className={classes.iconButton}>
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleDialogClose}
                    fullWidth
                    maxWidth='xs'
                >
                    <DialogTitle className={classes.editProfileDialog}>Edit Profile</DialogTitle>
                    <DialogContent className={classes.editProfileDialog}>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="A short bio about you..."
                                className={classes.dialogTextField}
                                value={this.state.bio}
                                onChange={this.onChangeHandler}
                                fullWidth
                            />
                            <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Your personal/professional website"
                                className={classes.dialogTextField}
                                value={this.state.website}
                                onChange={this.onChangeHandler}
                                fullWidth
                            />
                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Your current location"
                                className={classes.dialogTextField}
                                value={this.state.location}
                                onChange={this.onChangeHandler}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions className={classes.editProfileDialog}>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onSubmitHandler} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditProfile.propTypes = {
    editUserData: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserData })(withStyles(styles)(EditProfile));
