import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

import CustomIconButton from '../../utils/CustomIconButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Clear';

// Redux
import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataActions';

const styles = {
    deleteIconButton: {
        position: 'absolute',
        left: '90%',
        top: '0%',
        color: '#f44336'
    },
    dialogTitle: {
        background: 'rgb(254, 192, 56)',
        color: '#21202C'
    },
    dialogActions: {
        background: 'rgb(254, 192, 56)'
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
}

class DeletePostButton extends Component {
    constructor() {
        super();

        this.state = {
            open: false
        }
    }

    handleDialogOpen = () => {
        this.setState({ open: true });
    }

    handleDialogClose = () => {
        this.setState({ open: false });
    }

    deletePost = () => {
        this.props.deletePost(this.props.postId);
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <CustomIconButton toolTipTitle="Delete Post" onClick={this.handleDialogOpen} btnClassName={classes.deleteIconButton}>
                    <DeleteIcon />
                </CustomIconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleDialogClose}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle className={classes.dialogTitle}>Are you sure you want to delete?</DialogTitle>
                    <DialogActions className={classes.dialogActions}>
                        <CustomIconButton toolTipTitle='Cancel' onClick={this.handleDialogClose} btnClassName={classes.cancelIconButton}>
                            <CancelIcon />
                        </CustomIconButton>
                        <CustomIconButton toolTipTitle='Confirm' onClick={this.deletePost} btnClassName={classes.doneIconButton}>
                            <DoneIcon />
                        </CustomIconButton>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeletePostButton.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(null, { deletePost })(withStyles(styles)(DeletePostButton));
