import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomIconButton from '../../utils/CustomIconButton';


// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { connect } from 'react-redux';
import { addPost, clearErrors } from '../../redux/actions/dataActions';
import theme from '../../utils/theme';

const styles = {
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
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 15
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '88%',
        top: '3%'
    }
}

class NewPost extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            body: '',
            errors: {}
        }
    }

    // Updating errors from Redux store
    componentDidUpdate(prevProps) {
        // Helper Function to check if an object is empty
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }

        if (prevProps.ui.errors !== this.props.ui.errors) {
            if(isEmpty(this.props.ui.errors)) {
                this.setState({
                    body: '',
                    open: false,
                    errors: {}
                });
            }
            else {
                this.setState({
                    errors: this.props.ui.errors
                });
            }   
        }
    }

    dialogOpenHandler = () => {
        this.setState({ open: true })
    }

    dialogCloseHandler = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} })
    }

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmitHandler = e => {
        e.preventDefault();

        this.props.addPost({ body: this.state.body });
    }

    render() {
        const { errors } = this.state;
        const { classes, ui: { loading }} = this.props;

        return (
            <Fragment>
                <CustomIconButton onClick={this.dialogOpenHandler} toolTipTitle='New Buzz'>
                    <AddIcon />
                </CustomIconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.dialogCloseHandler}
                    fullWidth
                    maxWidth='xs'
                >
                    <CustomIconButton 
                        toolTipTitle='Close' 
                        onClick={this.dialogCloseHandler} 
                        toolTipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </CustomIconButton>
                    <DialogTitle className={classes.dialogTitle}>New Buzz</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <form onSubmit={this.onSubmitHandler}>
                            <TextField
                                name='body'
                                type='text'
                                label='Buzz'
                                multiline
                                rows='3'
                                placeholder='Whats happening?'
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.dialogTextField}
                                onChange={this.onChangeHandler}
                                fullWidth
                                value={this.state.body}
                            />

                            <Button 
                                type='submit' 
                                variant='outlined'
                                className={classes.submitButton}
                                disabled={loading}
                                color='primary'
                            >
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

NewPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    ui: state.ui
});

export default connect(mapStateToProps, { addPost, clearErrors })(withStyles(styles)(NewPost));