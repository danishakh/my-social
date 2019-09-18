import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomIconButton from '../../utils/CustomIconButton';

// Redux
import { connect } from 'react-redux';
import { editUserData } from '../../redux/actions/userActions';

// MUI
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Clear';
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
    dialogContent: {
        background: 'rgb(254, 192, 56)',
        color: '#21202C'
    },
    dialogTitle: {
        background: 'rgb(254, 192, 56)',
        color: '#21202C'
    },
    dialogActions: {
        background: 'rgb(254, 192, 56)'
    },
    editIconButton: {
        color: '#f5f5f4',
        float: 'right',
        '&:hover': {
            color: 'rgb(254, 192, 56)'
        }
    },
    cancelIconButton: {
        color: '#21202C',
        float: 'right',
        '&:hover': {
            color: '#f44336'
        }
    },
    doneIconButton: {
        color: '#21202C',
        float: 'right',
        '&:hover': {
            color: '#57ab78'
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

    dialogOpenHandler = () => {
        this.setState({ open: true });
        this.mapUserDataToState(this.props.credentials);
    }

    dialogCloseHandler = () => {
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
        this.dialogCloseHandler();
    }

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDataToState(credentials);
    }


    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CustomIconButton 
                    toolTipTitle="Edit Profile" 
                    placement="bottom" 
                    onClick={this.dialogOpenHandler}
                    btnClassName={classes.editIconButton}
                >
                    <EditIcon/>
                </CustomIconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.dialogCloseHandler}
                    fullWidth
                    maxWidth='xs'
                >
                    <DialogTitle className={classes.dialogTitle}>Edit Profile</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
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
                    <DialogActions className={classes.dialogActions}>
                        <CustomIconButton 
                            toolTipTitle="Cancel" 
                            placement="bottom" 
                            onClick={this.dialogCloseHandler}
                            btnClassName={classes.cancelIconButton}
                        >
                            <CancelIcon />
                        </CustomIconButton>

                        <CustomIconButton 
                            toolTipTitle="Update" 
                            placement="bottom" 
                            onClick={this.onSubmitHandler}
                            btnClassName={classes.doneIconButton}
                        >
                            <DoneIcon />
                        </CustomIconButton>
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
